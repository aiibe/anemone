# Use the official Go image with the specific version
FROM golang:1.23.2

# Install required dependencies for Zsh, Node.js, and Yarn
RUN apt-get update && apt-get install -y \
    curl \
    zsh \
    git && \
    curl -sL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs && \
    npm install -g yarn


# Install Oh My Zsh for a better Zsh experience
RUN sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)" || true

# Set Zsh as the default shell
RUN chsh -s $(which zsh)

# Set the working directory
WORKDIR /workspace

# Start with Zsh shell
CMD ["zsh"]