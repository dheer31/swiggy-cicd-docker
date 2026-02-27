pipeline {
    agent any

    environment {
        DOCKERHUB_USERNAME = 'dhee31'
        DOCKER_IMAGE = 'webapp'
        DOCKERHUB_REPO = 'swiggy'
        VERSION = "${BUILD_ID}"
        CONTAINER_NAME = 'app'
        CONTAINER_PORT = '8003'
        REQUEST_PORT = '80'
    }

    stages {

        stage("Docker Version") {
            steps {
                sh "sudo docker --version"
            }
        }

        stage("Build Docker Image") {
            steps {
                sh "sudo docker build -t ${DOCKER_IMAGE} ."
            }
        }

        stage("Docker Tag") {
            steps {
                sh """
                sudo docker tag ${DOCKER_IMAGE} ${DOCKERHUB_USERNAME}/${DOCKERHUB_REPO}:${VERSION}
                sudo docker tag ${DOCKER_IMAGE} ${DOCKERHUB_USERNAME}/${DOCKERHUB_REPO}:latest
                """
            }
        }

        stage("Docker Images") {
            steps {
                sh "sudo docker images"
            }
        }

        stage("Remove Older Container") {
            steps {
                sh "sudo docker rm -f ${CONTAINER_NAME} || true"
            }
        }

        stage("Run Container") {
            steps {
                sh """
                sudo docker run -d \
                --name ${CONTAINER_NAME} \
                -p ${CONTAINER_PORT}:${REQUEST_PORT} \
                ${DOCKERHUB_USERNAME}/${DOCKERHUB_REPO}:latest
                """
            }
        }

        stage("Remove Docker Image Locally") {
            steps {
                sh "sudo docker rmi -f ${DOCKERHUB_USERNAME}/${DOCKERHUB_REPO}:${VERSION} || true"
            }
        }
    }
}
