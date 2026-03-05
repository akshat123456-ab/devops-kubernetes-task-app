pipeline {
  agent {
    kubernetes {
      yaml """
apiVersion: v1
kind: Pod
spec:
  containers:
  - name: kaniko
    image: gcr.io/kaniko-project/executor:latest
    command:
      - /busybox/sh
    args:
      - -c
      - sleep 999999
    volumeMounts:
      - name: docker-config
        mountPath: /kaniko/.docker
  volumes:
    - name: docker-config
      secret:
        secretName: dockerhub-secret
"""
    }
  }

  stages {

    stage('Checkout Code') {
      steps {
        git branch: 'main',
        url: 'https://github.com/akshat123456-ab/devops-kubernetes-task-app.git'
      }
    }

    stage('Build Backend Image') {
      steps {
        container('kaniko') {
          sh '''
          /kaniko/executor \
          --context $(pwd)/backend \
          --dockerfile $(pwd)/backend/Dockerfile \
          --destination akshat123mehra/task-backend:latest
          '''
        }
      }
    }

    stage('Build Frontend Image') {
      steps {
        container('kaniko') {
          sh '''
          /kaniko/executor \
          --context $(pwd)/frontend \
          --dockerfile $(pwd)/frontend/Dockerfile \
          --destination akshat123mehra/task-frontend:latest
          '''
        }
      }
    }

  }
}