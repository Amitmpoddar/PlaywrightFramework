pipeline {

    agent any

    // ==========================================
    // Build Parameters
    // ==========================================

    parameters {

        choice(
            name: 'TEST_ENV',
            choices: ['qa', 'uat', 'prod'],
            description: 'Select the environment for test execution'
        )
    }


    // ==========================================
    // Scheduled Build
    // ==========================================

    triggers {

        // Every day at 11:50 AM
        cron('50 11 * * *')
    }


    // ==========================================
    // Global Environment Variables
    // ==========================================

    environment {

        // --------------------------------------
        // Selected Environment
        // --------------------------------------

        TEST_ENV = "${params.TEST_ENV}"
        ENV = "${params.TEST_ENV}"


        // --------------------------------------
        // Browser Configuration
        // --------------------------------------

        BROWSER = 'chromium'
        HEADLESS = 'true'


        // --------------------------------------
        // Timeout Configuration
        // --------------------------------------

        DEFAULT_TIMEOUT = '60000'
        EXPECT_TIMEOUT = '10000'


        // --------------------------------------
        // API Authentication
        // --------------------------------------

        AUTH_URL = 'https://dummyjson.com/auth/login'

        CLIENT_ID = 'not-used'

        CLIENT_SECRET = 'not-used'


        // --------------------------------------
        // Jenkins Credentials
        // --------------------------------------

        TEST_CREDENTIALS = credentials('api-test-user')

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
        // Stage 2 - Configure Environment
        // ==========================================

        stage('Configure Environment') {

            steps {

                script {

                    switch (params.TEST_ENV) {

                        case 'qa':

                            env.BASE_URL =
                                'https://www.saucedemo.com/'

                            env.API_BASE_URL =
                                'https://dummyjson.com'

                            break


                        case 'uat':

                            env.BASE_URL =
                                'https://www.saucedemo.com/'

                            env.API_BASE_URL =
                                'https://dummyjson.com'

                            break


                        case 'prod':

                            env.BASE_URL =
                                'https://www.saucedemo.com/'

                            env.API_BASE_URL =
                                'https://dummyjson.com'

                            break


                        default:

                            error(
                                "Unsupported environment: ${params.TEST_ENV}"
                            )
                    }


                    echo "=========================================="
                    echo "Test Environment : ${env.ENV}"
                    echo "Base URL         : ${env.BASE_URL}"
                    echo "API Base URL     : ${env.API_BASE_URL}"
                    echo "=========================================="
                }
            }
        }


        // ==========================================
        // Stage 3 - Install Dependencies
        // ==========================================

        stage('Install Dependencies') {

            steps {

                bat 'npm ci'
            }
        }


        // ==========================================
        // Stage 4 - Install Playwright Browsers
        // ==========================================

        stage('Install Playwright Browsers') {

            steps {

                bat 'npx playwright install chromium'
            }
        }


        // ==========================================
        // Stage 5 - Run API Tests
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
        // Always
        // ------------------------------------------

        always {

            // --------------------------------------
            // JUnit Results
            // --------------------------------------

            junit(
                testResults: 'reports/results.xml',
                allowEmptyResults: true
            )


            // --------------------------------------
            // Allure Report
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
            // Archive Reports
            // --------------------------------------

            archiveArtifacts(
                artifacts:
                    'reports/**/*, allure-results/**/*',
                allowEmptyArchive: true
            )
        }


        // ------------------------------------------
        // SUCCESS Email
        // ------------------------------------------

        success {

            emailext(

                to: 'amitmpoddar@gmail.com',

                subject:
                    "SUCCESS: ${env.JOB_NAME} #${env.BUILD_NUMBER}",

                body:
"""
Hello,

Playwright API Automation execution completed successfully.

Job         : ${env.JOB_NAME}
Build       : #${env.BUILD_NUMBER}
Environment : ${params.TEST_ENV}
Status      : ${currentBuild.currentResult}

Jenkins Build:
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
        // FAILURE Email
        // ------------------------------------------

        failure {

            emailext(

                to: 'amitmpoddar@gmail.com',

                subject:
                    "FAILED: ${env.JOB_NAME} #${env.BUILD_NUMBER}",

                body:
"""
Hello,

Playwright API Automation execution FAILED.

Job         : ${env.JOB_NAME}
Build       : #${env.BUILD_NUMBER}
Environment : ${params.TEST_ENV}
Status      : ${currentBuild.currentResult}

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