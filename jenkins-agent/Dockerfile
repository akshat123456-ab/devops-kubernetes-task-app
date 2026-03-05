FROM jenkins/inbound-agent:latest

USER root

RUN apt-get update && \
    apt-get install -y docker.io git curl

# Install kubectl
RUN curl -LO https://dl.k8s.io/release/v1.30.0/bin/linux/amd64/kubectl && \
    install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl

# allow docker access
RUN chmod 666 /var/run/docker.sock || true

USER root