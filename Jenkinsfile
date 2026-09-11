pipeline {

    agent any

    environment {
        TEST_ENV = 'qa'
    }

    stages {

        stage('Install Dependencies') {

            steps {

                bat 'npm ci'
            }
        }


        stage('Install Playwright Browsers') {

            steps {

                bat 'npx playwright install chromium'
            }
        }


        stage('Run API Tests') {

            steps {

                bat 'npx playwright test tests/api'
            }
        }
    }


    post {

        always {

            archiveArtifacts artifacts:
                'reports/**/*',
                allowEmptyArchive: true
        }
    }
}