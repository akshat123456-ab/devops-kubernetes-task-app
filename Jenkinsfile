podTemplate(
  containers: [
    containerTemplate(
      name: 'jnlp',
      image: 'jenkins/inbound-agent:alpine-jdk17'
    ),
    containerTemplate(
      name: 'kaniko',
      image: 'gcr.io/kaniko-project/executor:latest',
      ttyEnabled: true,
      command: 'sh'
    )
  ]
) {
  node(POD_LABEL) {

    stage('Checkout') {
      git 'https://github.com/akshat123456-ab/devops-kubernetes-task-app.git'
    }

    stage('Build Backend Image') {
      container('kaniko') {
        sh '''
        /kaniko/executor \
        --context backend \
        --dockerfile backend/Dockerfile \
        --destination akshat123mehra/task-backend:latest
        '''
      }
    }

    stage('Build Frontend Image') {
      container('kaniko') {
        sh '''
        /kaniko/executor \
        --context frontend \
        --dockerfile frontend/Dockerfile \
        --destination akshat123mehra/task-frontend:latest
        '''
      }
    }

  }
}