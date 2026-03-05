FROM jenkins/inbound-agent:latest

USER root

# Install docker
RUN apt-get update && \
    apt-get install -y docker.io

# Install kubectl
RUN curl -LO https://dl.k8s.io/release/v1.30.0/bin/linux/amd64/kubectl && \
    install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl

# Install git
RUN apt-get install -y git

USER jenkins