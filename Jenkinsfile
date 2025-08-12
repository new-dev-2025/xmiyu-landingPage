pipeline {
    agent any

    environment {
        // Production Server Credentials
        SERVER_PROD_CREDENTIALS_ID = 'tf_credentials'
        SERVER_IPS = '47.76.25.141'
        FOLDER_PROJECT = '/opt/project/xmiyu-landingPage'

    }

    stages {
        stage('Deployment to Production') {
            steps {
                echo "🚀 Deploying to production environment"
                script {
                    withCredentials([usernamePassword(
                        credentialsId: env.SERVER_PROD_CREDENTIALS_ID, 
                        usernameVariable: 'PROD_USER', 
                        passwordVariable: 'PROD_PASS')]) {
                        echo "Connecting to server: ${env.SERVER_IPS}"
                        sh """
                            SSHPASS=$PROD_PASS sshpass -e ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null ${PROD_USER}@${env.SERVER_IPS} \
                            "cd ${FOLDER_PROJECT} && ls -l && git branch && git checkout main && git pull && npm install && npm run build"
                        """
                    }
                }
            }
        }

    }

}