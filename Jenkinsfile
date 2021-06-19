pipeline {
    agent {
        docker {
            image 'node:14'
            args '-p 5000:5000'
        }
    }
    environment {
        CI = 'true' 
        doError = '0'
    
    }
    stages {
        stage('Build') {
            steps {
                
                sh 'npm install --prefix frontend'
                sh 'npm install'
                sh 'pwd'
                
            }
        }
        
        stage('Test') {
      environment {
        CI = 'true'
      }
      steps {
            sh 'npm test --prefix frontend'  
        
        
      }
    }

      stage('Error') {
            when {
                expression { doError == '1' }
            }
            steps {
                mail to: 'atinvento@gmail.com',               
                    subject: "Job $JOB_NAME failure" ,
                    body: "Build $BUILD_NUMBER failed.Go to $BUILD_URL for more info."
            }
        }
        
        stage('Success') {
            when {
                expression { doError == '0' }
            }
            steps {
                mail to: 'atinvento@gmail.com',               
                    subject: "Job $JOB_NAME Success" ,
                    body: "Build $BUILD_NUMBER is a success.Go to $BUILD_URL for more info."
            }
        }
    
    
    }
}
