pipeline {

    agent any

    // ==========================================
    // Scheduled Build
    // ==========================================
    triggers {
        // Every day at 11:50 AM
        cron('50 11 * * *')
    }

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
        // Authentication
        // -----------------------------
        AUTH_URL = 'https://dummyjson.com/auth/login'
        CLIENT_ID = 'not-used'
        CLIENT_SECRET = 'not-used'

        // -----------------------------
        // Jenkins Credentials
        // -----------------------------
        // Credential ID created in Jenkins
        TEST_CREDENTIALS = credentials('api-test-user')

        // Map Jenkins credentials to
        // variables expected by env.ts
        TEST_USERNAME = "${TEST_CREDENTIALS_USR}"
        TEST_PASSWORD = "${TEST_CREDENTIALS_PSW}"
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

        // ------------------------------------------
        // Always execute
        // ------------------------------------------
        always {

            // Publish JUnit test results
            junit(
                testResults: 'reports/results.xml',
                allowEmptyResults: true
            )

            // --------------------------------------
            // Publish Allure report only when
            // allure-results directory exists
            // --------------------------------------
            script {

                if (fileExists('allure-results')) {

                    allure(
                        includeProperties: false,
                        results: [
                            [path: 'allure-results']
                        ]
                    )

                } else {

                    echo 'Allure results not found. Skipping Allure report.'

                }
            }

            // --------------------------------------
            // Archive Playwright and Allure results
            // --------------------------------------
            archiveArtifacts(
                artifacts: 'reports/**/*, allure-results/**/*',
                allowEmptyArchive: true
            )
        }

        // ------------------------------------------
        // Email when build succeeds
        // ------------------------------------------
        success {

            emailext(
                to: 'amitmpoddar@gmail.com',
                subject: "SUCCESS: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                body: """
Hello,

Playwright API Automation execution completed successfully.

Job        : ${env.JOB_NAME}
Build      : #${env.BUILD_NUMBER}
Status     : ${currentBuild.currentResult}

Test Report:
${env.BUILD_URL}

Allure Report:
${env.BUILD_URL}allure

Regards,
Jenkins
""",
                attachLog: true
            )
        }

        // ------------------------------------------
        // Email when build fails
        // ------------------------------------------
        failure {

            emailext(
                to: 'amitmpoddar@gmail.com',
                subject: "FAILED: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                body: """
Hello,

Playwright API Automation execution FAILED.

Job        : ${env.JOB_NAME}
Build      : #${env.BUILD_NUMBER}
Status     : ${currentBuild.currentResult}

Please check the Jenkins build:

${env.BUILD_URL}

Allure Report:
${env.BUILD_URL}allure

Regards,
Jenkins
""",
                attachLog: true
            )
        }
    }
}