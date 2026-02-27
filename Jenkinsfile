
pipeline {
    agent any

    environment {
        DOCKERHUB_USERNAME = 'sakit333'
        DOCKER_IMAGE = 'webapp'
        DOCKERHUB_REPO = 'zepto-brocode'
        VERSION = '$BUILD_ID'
        CONTAINER_NAME = 'app'
        CONTAINER_PORT = '8003'
        REQUEST_PORT = '80'
    }
    stages {
        stage("docker version") {
            steps {
                sh "sudo docker --version"
            }
        }
        stage("Build Docker Image"){
            steps {
                sh "sudo docker build -t ${DOCKER_IMAGE} ."
            }
        }
        stage("Docker tag") {
            steps {
                sh """
                sudo docker tag ${DOCKER_IMAGE} ${DOCKERHUB_USERNAME}/${DOCKERHUB_REPO}:${VERSION}
                sudo docker tag ${DOCKER_IMAGE} ${DOCKERHUB_USERNAME}/${DOCKERHUB_REPO}:latest
                """
            }
        }
        stage("Docker Images"){
            steps {
                sh "sudo docker images"
            }
        }
        stage("Remove Older Container") {
            steps {
                sh "sudo docker rm -f ${CONTAINER_NAME}"
            }
            post {
                success {
                    echo "Container is removed"
                }
                failure {
                    echo "Container is not Present...."
                    sh "sudo docker run -it -d --name ${CONTAINER_NAME} -p ${CONTAINER_PORT}:${REQUEST_PORT} ${DOCKERHUB_USERNAME}/${DOCKERHUB_REPO}:latest"
                }
            }
        }
        stage("Run Container"){
            steps{
                sh "sudo docker run -it -d --name ${CONTAINER_NAME} -p ${CONTAINER_PORT}:${REQUEST_PORT} ${DOCKERHUB_USERNAME}/${DOCKERHUB_REPO}:latest"
            }
            post {
                always {
                    echo "Docker container from Server"
                }
                success {
                    echo "Docker continer deployed successfully"
                }
                failure {
                    echo "Docker container is alreay Running"
                }
            }
        }
        stage("Remove docker image locally") {
            steps {
                sh "sudo docker rmi -f ${DOCKERHUB_USERNAME}/${DOCKERHUB_REPO}:${VERSION}"
            }
        }
    }
}

