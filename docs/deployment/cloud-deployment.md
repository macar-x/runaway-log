# Cloud Deployment for RunawayLog

This document provides detailed guidance on deploying RunawayLog to various cloud platforms. Cloud deployment offers scalability, reliability, and managed services that can simplify your deployment and maintenance processes.

## Why Use Cloud Deployment?

Cloud deployment offers several benefits for RunawayLog:

- **Scalability**: Automatically scale resources based on demand
- **Reliability**: High availability and redundancy
- **Managed Services**: Reduce operational overhead
- **Global Reach**: Deploy closer to your users
- **Security**: Built-in security features and compliance
- **Cost Efficiency**: Pay only for what you use

## Cloud Platform Options

RunawayLog can be deployed to any cloud platform that supports static website hosting or Docker containers. This guide covers the following platforms:

1. **AWS (Amazon Web Services)**
2. **GCP (Google Cloud Platform)**
3. **Azure (Microsoft Azure)**
4. **DigitalOcean**
5. **Vercel/Netlify (Static Hosting)**

## AWS Deployment

### Option 1: Static Website Hosting with S3 and CloudFront

1. **Create an S3 Bucket**:
   - Go to the AWS S3 console
   - Click "Create bucket"
   - Enter a unique bucket name
   - Select a region
   - Uncheck "Block all public access"
   - Enable "Static website hosting"
   - Set index document to `index.html`
   - Set error document to `index.html` (for SPA routing)
   - Click "Create bucket"

2. **Set Bucket Policy**:
   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Sid": "PublicReadGetObject",
         "Effect": "Allow",
         "Principal": "*",
         "Action": "s3:GetObject",
         "Resource": "arn:aws:s3:::YOUR-BUCKET-NAME/*"
       }
     ]
   }
   ```

3. **Build RunawayLog**:
   ```bash
   npm run build
   ```

4. **Upload Build Artifacts**:
   ```bash
   aws s3 sync dist/ s3://YOUR-BUCKET-NAME/
   ```

5. **Create a CloudFront Distribution**:
   - Go to the CloudFront console
   - Click "Create distribution"
   - Set Origin Domain Name to your S3 bucket
   - Set Default Root Object to `index.html`
   - Enable "Redirect HTTP to HTTPS"
   - Set Error Pages for 404 to redirect to `/index.html` with 200 status
   - Click "Create distribution"

6. **Access Your Application**:
   - Use the CloudFront distribution domain name
   - Example: `https://d1234567890.cloudfront.net`

### Option 2: Docker Deployment with ECS

1. **Create an ECR Repository**:
   ```bash
   aws ecr create-repository --repository-name runaway-log --region us-east-1
   ```

2. **Build and Push Docker Image**:
   ```bash
   # Build the image
   docker build -t runaway-log .
   
   # Tag the image
   docker tag runaway-log:latest ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com/runaway-log:latest
   
   # Authenticate Docker to ECR
   aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com
   
   # Push the image
   docker push ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com/runaway-log:latest
   ```

3. **Create an ECS Cluster**:
   - Go to the ECS console
   - Click "Create cluster"
   - Choose "EC2 Linux + Networking"
   - Configure cluster settings
   - Click "Create"

4. **Create an ECS Task Definition**:
   - Go to the ECS console
   - Click "Create new Task Definition"
   - Choose "EC2"
   - Configure task settings
   - Set container image to your ECR image URI
   - Set port mappings (80:80)
   - Click "Create"

5. **Run the Task**:
   - Go to the ECS cluster
   - Click "Run new Task"
   - Choose your task definition
   - Set number of tasks to 1
   - Click "Run Task"

## GCP Deployment

### Option 1: Static Website Hosting with Cloud Storage

1. **Create a Cloud Storage Bucket**:
   ```bash
   gsutil mb -b on -l us-east1 gs://runaway-log-example
   ```

2. **Set Bucket Policy**:
   ```bash
   gsutil iam ch allUsers:objectViewer gs://runaway-log-example
   ```

3. **Enable Static Website Hosting**:
   ```bash
   gsutil web set -m index.html -e index.html gs://runaway-log-example
   ```

4. **Build and Upload Artifacts**:
   ```bash
   npm run build
   gsutil -m cp -r dist/* gs://runaway-log-example/
   ```

5. **Access Your Application**:
   - Use the bucket's static website URL
   - Example: `https://runaway-log-example.storage.googleapis.com/index.html`

### Option 2: Docker Deployment with Cloud Run

1. **Build and Push Docker Image**:
   ```bash
   # Build the image
   docker build -t gcr.io/PROJECT_ID/runaway-log .
   
   # Push the image to Container Registry
   docker push gcr.io/PROJECT_ID/runaway-log
   ```

2. **Deploy to Cloud Run**:
   ```bash
   gcloud run deploy runaway-log \
     --image gcr.io/PROJECT_ID/runaway-log \
     --platform managed \
     --region us-east1 \
     --allow-unauthenticated
   ```

3. **Access Your Application**:
   - Use the Cloud Run service URL provided in the output

## Azure Deployment

### Option 1: Static Website Hosting with Blob Storage

1. **Create a Storage Account**:
   ```bash
   az storage account create \
     --name runawaylogstorage \
     --resource-group runaway-log-rg \
     --location eastus \
     --sku Standard_LRS \
     --kind StorageV2 \
     --access-tier Hot
   ```

2. **Enable Static Website Hosting**:
   ```bash
   az storage blob service-properties update \
     --account-name runawaylogstorage \
     --static-website \
     --404-document index.html \
     --index-document index.html
   ```

3. **Build and Upload Artifacts**:
   ```bash
   npm run build
   az storage blob upload-batch \
     --account-name runawaylogstorage \
     --source dist \
     --destination $web
   ```

4. **Access Your Application**:
   - Get the static website URL:
     ```bash
     az storage account show \
       --name runawaylogstorage \
       --resource-group runaway-log-rg \
       --query "primaryEndpoints.web" \
       --output tsv
     ```

### Option 2: Docker Deployment with Azure Container Apps

1. **Create a Resource Group**:
   ```bash
   az group create \
     --name runaway-log-rg \
     --location eastus
   ```

2. **Create a Container App Environment**:
   ```bash
   az containerapp env create \
     --name runaway-log-env \
     --resource-group runaway-log-rg \
     --location eastus
   ```

3. **Deploy the Container App**:
   ```bash
   az containerapp create \
     --name runaway-log \
     --resource-group runaway-log-rg \
     --environment runaway-log-env \
     --image macar-x/runaway-log:latest \
     --target-port 80 \
     --ingress external \
     --query "properties.configuration.ingress.fqdn"
   ```

4. **Access Your Application**:
   - Use the FQDN provided in the output

## DigitalOcean Deployment

### Option 1: Droplet Deployment

1. **Create a Droplet**:
   - Go to the DigitalOcean console
   - Click "Create" > "Droplets"
   - Choose Ubuntu 22.04 LTS
   - Select a size (1GB RAM, 1 vCPU recommended)
   - Configure additional options
   - Click "Create Droplet"

2. **Set Up Docker**:
   ```bash
   ssh root@YOUR_DROPLET_IP
   
   # Install Docker
   curl -fsSL https://get.docker.com -o get-docker.sh
   sh get-docker.sh
   
   # Install Docker Compose
   apt-get install docker-compose -y
   ```

3. **Deploy RunawayLog**:
   ```bash
   git clone https://github.com/macar-x/runaway-log.git
   cd runaway-log
   docker compose up -d
   ```

4. **Access Your Application**:
   - Open your browser and navigate to `http://YOUR_DROPLET_IP:8080`

### Option 2: App Platform

1. **Create an App**:
   - Go to the DigitalOcean App Platform
   - Click "Create App"
   - Connect your GitHub repository
   - Select the main branch
   - Choose "Static Site" as the app type
   - Click "Next"

2. **Configure Build Settings**:
   - Set build command to `npm run build`
   - Set publish directory to `dist`
   - Click "Next"

3. **Deploy the App**:
   - Configure resource settings
   - Click "Create App"

4. **Access Your Application**:
   - Use the URL provided in the App Platform console

## Vercel/Netlify Deployment

### Vercel

1. **Sign Up/Login**:
   - Go to [Vercel](https://vercel.com/) and sign up or log in

2. **Import Your Project**:
   - Click "Add New" > "Project"
   - Import your GitHub repository
   - Vercel will automatically detect the React/Vite project

3. **Configure Project**:
   - Set framework preset to "Vite"
   - Set build command to `npm run build`
   - Set output directory to `dist`
   - Click "Deploy"

4. **Access Your Application**:
   - Use the URL provided by Vercel after deployment

### Netlify

1. **Sign Up/Login**:
   - Go to [Netlify](https://www.netlify.com/) and sign up or log in

2. **Import Your Project**:
   - Click "Add new site" > "Import an existing project"
   - Connect your GitHub repository

3. **Configure Build Settings**:
   - Set build command to `npm run build`
   - Set publish directory to `dist`
   - Click "Deploy site"

4. **Access Your Application**:
   - Use the URL provided by Netlify after deployment

## Cloud Deployment Best Practices

### 1. Use Infrastructure as Code (IaC)

- **Terraform**: For managing cloud infrastructure
- **CloudFormation**: AWS-specific IaC
- **Deployment Manager**: GCP-specific IaC
- **ARM Templates**: Azure-specific IaC

### 2. Implement CI/CD

- **GitHub Actions**: For automating builds and deployments
- **GitLab CI**: For GitLab repositories
- **Jenkins**: Self-hosted CI/CD

### 3. Enable Monitoring and Logging

- **AWS CloudWatch**: For AWS deployments
- **GCP Cloud Monitoring**: For GCP deployments
- **Azure Monitor**: For Azure deployments
- **Datadog**: For multi-cloud monitoring

### 4. Implement Auto-Scaling

- **AWS Auto Scaling**: For EC2 instances
- **GCP Autoscaler**: For GCP instances
- **Azure Autoscale**: For Azure VMs

### 5. Use a CDN

- **AWS CloudFront**: For AWS deployments
- **Google Cloud CDN**: For GCP deployments
- **Azure CDN**: For Azure deployments
- **Cloudflare**: For any cloud platform

### 6. Implement Security Best Practices

- Enable HTTPS for all deployments
- Use strong authentication for cloud accounts
- Implement least privilege access
- Regularly rotate access keys
- Enable logging and monitoring

## Cost Optimization

1. **Right-Size Resources**:
   - Use appropriate instance sizes
   - Scale resources based on demand

2. **Use Reserved Instances**:
   - For predictable workloads
   - Significant cost savings over on-demand

3. **Leverage Free Tiers**:
   - AWS Free Tier
   - GCP Free Tier
   - Azure Free Account

4. **Implement Cost Monitoring**:
   - AWS Cost Explorer
   - GCP Cost Management
   - Azure Cost Management

5. **Use Serverless Options**:
   - AWS Lambda
   - GCP Cloud Functions
   - Azure Functions
   - More cost-effective for variable workloads

## Automation Options

### GitHub Actions Workflow Example

```yaml
name: Deploy to Cloud

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'
      
      - name: Install dependencies
        run: npm install
      
      - name: Build
        run: npm run build
      
      # Example: Deploy to Vercel
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          working-directory: ./
```

## Troubleshooting Cloud Deployment Issues

### Deployment Fails

1. **Check Build Logs**:
   - AWS CodeBuild logs
   - GCP Cloud Build logs
   - Azure DevOps pipelines
   - Vercel/Netlify build logs

2. **Verify Environment Variables**:
   - Ensure all required variables are set
   - Check variable names and values

3. **Check Resource Limits**:
   - AWS service quotas
   - GCP resource quotas
   - Azure subscription limits

### Application Not Accessible

1. **Check Firewall Rules**:
   - Ensure ports are open
   - Verify security groups/network policies

2. **Check DNS Configuration**:
   - Verify domain name resolution
   - Check CDN configuration

3. **Test Connection**:
   - Use curl to test connectivity
   - Check network configuration

### High Costs

1. **Analyze Cost Breakdown**:
   - Identify expensive resources
   - Look for unused resources

2. **Optimize Resource Usage**:
   - Scale down over-provisioned resources
   - Use spot instances for non-critical workloads
   - Implement auto-scaling

## Conclusion

Cloud deployment offers numerous benefits for RunawayLog, including scalability, reliability, and managed services. Whether you choose AWS, GCP, Azure, or a static hosting platform like Vercel/Netlify, this guide provides the necessary steps to deploy your application. By following best practices for infrastructure as code, CI/CD, monitoring, and cost optimization, you can ensure a successful and efficient cloud deployment.

Remember to regularly review your deployment and make adjustments as needed to ensure optimal performance, security, and cost efficiency.
