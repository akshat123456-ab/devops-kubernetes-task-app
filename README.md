![Docker](https://img.shields.io/badge/Docker-Container-blue)
![Kubernetes](https://img.shields.io/badge/Kubernetes-Orchestration-blue)
![CI/CD](https://img.shields.io/badge/CI/CD-GitHub%20Actions-green)
![Monitoring](https://img.shields.io/badge/Monitoring-Prometheus%20Grafana-orange)

# 🚀 DevOps Kubernetes MERN CI/CD Project

A production-style DevOps project demonstrating a full deployment pipeline using **Docker, Kubernetes, CI/CD, Ingress, Persistent Storage, Monitoring, and GitOps**.

This project deploys a MERN-style application (Frontend + Backend + MongoDB) on Kubernetes with automated CI/CD and monitoring.

---

# 🧩 Architecture

```
Developer
   │
   ▼
GitHub Repository
   │
   ▼
GitHub Actions (CI Pipeline)
   │
   ├── Build Docker Images
   └── Push to Docker Hub
   │
   ▼
ArgoCD (GitOps Deployment)
   │
   ▼
Kubernetes Cluster
   │
   ├── Ingress Controller
   │      │
   │      ├── Frontend Service
   │      └── Backend Service
   │
   └── MongoDB Stateful Storage
           │
           ▼
      Persistent Volume
           
Monitoring Stack
   │
   ├── Prometheus
   └── Grafana
```

---

# ⚙️ Tech Stack

### Containerization

* Docker
* Docker Hub

### Orchestration

* Kubernetes
* Services
* Ingress

### Configuration Management

* ConfigMap
* Secrets

### Storage

* PersistentVolume
* PersistentVolumeClaim

### Monitoring

* Prometheus
* Grafana

### CI/CD

* GitHub Actions

### GitOps

* ArgoCD

---

# 📁 Project Structure

```
devops-task-app
│
├── frontend
│
├── backend
│
├── k8s
│   ├── backend.yaml
│   ├── frontend.yaml
│   ├── mongodb.yaml
│   ├── mongo-pvc.yaml
│   ├── configmap.yaml
│   ├── secret.yaml
│   ├── ingress.yaml
│   └── argocd-app.yaml
│
├── .github/workflows
│   └── deploy.yml
│
├── docker-compose.yml
│
└── README.md
```

---

# 🔧 Features Implemented

✔ Dockerized MERN application
✔ Docker Hub image registry
✔ Kubernetes deployments and services
✔ Ingress-based routing
✔ ConfigMap and Secret management
✔ Persistent storage for MongoDB
✔ Prometheus & Grafana monitoring
✔ CI/CD pipeline with GitHub Actions
✔ GitOps deployment using ArgoCD

---

# 🚀 Deployment Flow

```
git push
   ↓
GitHub Actions
   ↓
Docker Image Build
   ↓
Push to Docker Hub
   ↓
ArgoCD detects change
   ↓
Kubernetes deployment updated
```

---

# 📊 Monitoring

Grafana dashboards provide:

* Pod CPU usage
* Memory usage
* Container health
* Node metrics
* Cluster status

---

# 🌐 Application Access

```
http://taskapp.local
```

Ingress routes traffic to:

```
/      → Frontend
/api   → Backend
```

---

# 🧠 DevOps Concepts Demonstrated

* Containerization
* Infrastructure as Code
* Kubernetes Networking
* Service Discovery
* GitOps workflow
* CI/CD automation
* Observability

---

# 👨‍💻 Author

Built as a DevOps portfolio project demonstrating modern cloud-native deployment practices.
