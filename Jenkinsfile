pipeline {

    agent any

    environment {

        // -----------------------------
        // Test Environment
        // -----------------------------
        TEST_ENV = 'qa'

        ENV = 'qa'

        BASE_URL = 'https://practice-automation.com/'

        API_BASE_URL = 'https://dummyjson.com'


        // -----------------------------
        // Browser Configuration
        // -----------------------------
        BROWSER = 'chromium'

        HEADLESS = 'true'


        // -----------------------------
        // Timeout Configuration
        // -----------------------------
        DEFAULT_TIMEOUT = '30000'

        EXPECT_TIMEOUT = '10000'


        // -----------------------------
        // Test User
        // -----------------------------
        TEST_USERNAME = 'emilys'

        TEST_PASSWORD = 'emilyspass'


        // -----------------------------
        // Authentication
        // -----------------------------
        AUTH_URL = 'https://dummyjson.com/auth/login'

        CLIENT_ID = 'not-used'

        CLIENT_SECRET = 'not-used'
    }


    stages {


        // ==========================================
        // Stage 1 - Checkout
        // ==========================================
        stage('Checkout') {

            steps {

                checkout scm
            }
        }


        // ==========================================
        // Stage 2 - Install Dependencies
        // ==========================================
        stage('Install Dependencies') {

            steps {

                bat 'npm ci'
            }
        }


        // ==========================================
        // Stage 3 - Install Playwright Browser
        // ==========================================
        stage('Install Playwright Browsers') {

            steps {

                bat 'npx playwright install chromium'
            }
        }


        // ==========================================
        // Stage 4 - Run API Tests
        // ==========================================
        stage('Run API Tests') {

            steps {

                bat 'npx playwright test --project=api'
            }
        }
    }


    // ==========================================
    // Post Build
    // ==========================================
    post {

        always {

            archiveArtifacts artifacts:
                'reports/**/*',
                allowEmptyArchive: true
        }
    }
}