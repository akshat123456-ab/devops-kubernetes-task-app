pipeline {
    agent any

    environment {
        DOCKERHUB_USER = "akshat123mehra"
        IMAGE_BACKEND = " akshat123mehra/task-backend"
        IMAGE_FRONTEND = "akshat123mehra/task-frontend"
    }

    stages {

        stage('Checkout Code') {
            steps {
                git 'https://github.com/akshat123456-ab/devops-kubernetes-task-app.git'
            }
        }

        stage('Build Backend Image') {
            steps {
                sh 'docker build -t $IMAGE_BACKEND:latest ./backend'
            }
        }

        stage('Build Frontend Image') {
            steps {
                sh 'docker build -t $IMAGE_FRONTEND:latest ./frontend'
            }
        }

        stage('Push Images') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub',
                    usernameVariable: 'USERNAME',
                    passwordVariable: 'PASSWORD'
                )]) {
                    sh 'docker login -u $USERNAME -p $PASSWORD'
                    sh 'docker push $IMAGE_BACKEND:latest'
                    sh 'docker push $IMAGE_FRONTEND:latest'
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                sh 'kubectl apply -f k8s/'
            }
        }
    }
}