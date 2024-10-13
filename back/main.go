package main

import (
	"embed"
	"flag"
	"fmt"
	"net/http/httputil"
	"net/url"
	"strings"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

// Embed static files into the binary
var (
	//go:embed dist
	dist embed.FS
	//go:embed dist/index.html
	indexHTML     embed.FS
	distDirFS     = echo.MustSubFS(dist, "dist")
	distIndexHtml = echo.MustSubFS(indexHTML, "dist")
)

func main() {
	e := echo.New()

	// CORS middleware
	e.Use(middleware.CORS())

	// Get the backend URL from the arguments
	backendURL := flag.String("host", "", "The URL of the backend to proxy to")
	flag.Parse()

	if *backendURL == "" {
		panic("You must provide a backend URL")
	}

	// Parse the URL
	parsedBackendURL, err := url.Parse(*backendURL)
	if err != nil {
		panic(fmt.Sprintf("Invalid backend URL: %s", err))
	}

	// Ensure the parsed URL has a valid host
	if parsedBackendURL.Host == "" {
		panic("The backend URL must contain a valid host")
	}

	// Create a reverse proxy
	proxy := httputil.NewSingleHostReverseProxy(parsedBackendURL)

	// Serve the static files
	e.FileFS("/", "index.html", distIndexHtml)
	e.StaticFS("/", distDirFS)

	// Define the /api route
	e.Any("/api/*", func(c echo.Context) error {
		// Get the original path
		originalPath := c.Request().URL.Path

		// Strip the /api prefix
		newPath := strings.TrimPrefix(originalPath, "/api")

		// Create a new request with the modified path
		req := c.Request().Clone(c.Request().Context())
		req.URL.Path = newPath
		req.URL.Scheme = parsedBackendURL.Scheme
		req.Host = parsedBackendURL.Host

		// Forward the request to the proxy
		proxy.ServeHTTP(c.Response(), req)
		return nil
	})

	// Start the server
	e.Logger.Fatal(e.Start(":8080"))
}
