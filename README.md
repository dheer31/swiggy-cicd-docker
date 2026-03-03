# 🚀 Deploy Static Webpage using Jenkins CI/CD (Docker Based)

## 📌 System Requirements

* **AMI**: Ubuntu 24.04
* **Instance Type**: t3.small
* **Storage**: 15 GB
* **Security Group**: Allow All Traffic (for testing purpose)

---

# 🛠 Step 1: Install Jenkins

```bash
sudo apt update
sudo apt install openjdk-17-jdk -y
```

Add Jenkins repository:

```bash
curl -fsSL https://pkg.jenkins.io/debian-stable/jenkins.io-2023.key | sudo tee \
  /usr/share/keyrings/jenkins-keyring.asc > /dev/null
```

```bash
echo deb [signed-by=/usr/share/keyrings/jenkins-keyring.asc] \
  https://pkg.jenkins.io/debian-stable binary/ | sudo tee \
  /etc/apt/sources.list.d/jenkins.list > /dev/null
```

```bash
sudo apt update
sudo apt install jenkins -y
sudo systemctl start jenkins
sudo systemctl enable jenkins
```

Access Jenkins:

```
http://<EC2-IP>:8080
```

---

# 🐳 Step 2: Install Docker

```bash
sudo apt install docker.io -y
sudo systemctl start docker
sudo systemctl enable docker
```

Give Jenkins sudo permission:

```bash
sudo visudo
```

Add:

```
jenkins ALL=(ALL) NOPASSWD: ALL
```

Restart Jenkins:

```bash
sudo systemctl restart jenkins
```

---

# 🔐 Step 3: Add DockerHub Credentials in Jenkins

1. Go to **Manage Jenkins**
2. Click **Credentials**
3. Select **Global**
4. Click **Add Credentials**
5. Choose **Username with password**
6. Provide:

   * DockerHub Username
   * DockerHub Password or Access Token
   * ID: `docker-creds`
7. Click **Create**

---

# ⚙ Step 4: Create Jenkins Pipeline Job

1. Click **New Item**
2. Enter project name
3. Select **Pipeline**
4. Click **OK**

---

## Configure Pipeline

### Triggers

* Configure as needed (optional)

### Pipeline Definition

* Definition: **Pipeline script from SCM**
* SCM: **Git**
* Repository URL: Paste your GitHub repository URL
* Branch: `*/master` (or main)

Click **Apply → Save**

---

# 🚀 Step 5: Build & Deploy

Click **Build Now**

Pipeline will:

* Clone GitHub repository
* Build Docker image
* Tag image
* Push image to DockerHub
* Remove old container
* Run new container

---

# 🌍 Access Your Static Website

Open in browser:

```
http://<EC2-IP>:8003
```

Your static webpage is now live 🎉

---

# 📌 Notes

* Ensure port **8003** is open in Security Group.
* Ensure DockerHub credentials ID matches Jenkinsfile.
* Use Access Token instead of password for better security.

---

# 🏁 Architecture Flow

GitHub → Jenkins → Docker Build → DockerHub → EC2 Container → Live Website

---

## 👨‍💻 Author

CI/CD implementation using Jenkins + Docker on AWS EC2.

