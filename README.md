sudo visudo
jenkins ALL=(ALL) NOPASSWD: ALL


docker-hub-credentials

2314: remote -> org.apache.maven.archetypes:maven-archetype-webapp (An archetype which contains a sample Maven Webapp project.)


sudo usermod -aG docker jenkins
sudo systemctl restart docker
sudo systemctl restart jenkins

Developed and CI/CD Pipeline Designed by: 👨‍💻 dhee31

This project demonstrates a full-stack web application deployed using a complete DevOps CI/CD pipeline on AWS infrastructure.

It automates:

Build

Containerization

Image versioning

DockerHub push

Automated deployment using Ansible

Built following real-world DevOps practices.

           ┌────────────────────┐
           │    Developer       │
           │  (Push Code)       │
           └─────────┬──────────┘
                     │
                     ▼
           ┌────────────────────┐
           │      GitHub        │
           │   Source Control   │
           └─────────┬──────────┘
                     │ Webhook / Poll SCM
                     ▼
           ┌────────────────────┐
           │      Jenkins       │
           │  CI/CD Orchestrator│
           └─────────┬──────────┘
                     │
        ┌────────────┼─────────────┐
        ▼            ▼             ▼
  Docker Build   Docker Tag    Docker Push
                     │
                     ▼
           ┌────────────────────┐
           │    DockerHub       │
           │  Image Registry    │
           └─────────┬──────────┘
                     │
                     ▼
           ┌────────────────────┐
           │     Ansible        │
           │  Deployment Engine │
           └─────────┬──────────┘
                     │ SSH
                     ▼
           ┌────────────────────┐
           │   Worker EC2 Node  │
           │  Docker Container  │
           └─────────┬──────────┘
                     │
                     ▼
              🌐 Live Web App
              
              
  Developer → GitHub → Jenkins → Docker Build → DockerHub Push → Ansible → Target EC2

  sudo vi /etc/nginx/sites-available/reverse-proxy




   server {
    listen 80 default_server;
    listen [::]:80 default_server;

    server_name _;

    location / {
        proxy_pass http://13.235.57.138:8081;
        proxy_http_version 1.1;

        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
sudo rm /etc/nginx/sites-enabled/default
sudo ln -s /etc/nginx/sites-available/reverse-proxy /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx


