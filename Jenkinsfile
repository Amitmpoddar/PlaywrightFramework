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


    // ==========================================
    // Stages
    // ==========================================

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

                sh 'npm ci'
            }
        }


        // ==========================================
        // Stage 4 - Install Playwright Browsers
        // ==========================================

        stage('Install Playwright Browsers') {

            steps {

                sh 'npx playwright install chromium'
            }
        }


        // ==========================================
        // Stage 5 - Run API Tests
        // ==========================================

        stage('Run API Tests') {

            steps {

                sh 'npx playwright test --project=api'
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

            script {

                if (fileExists('reports/results.xml')) {

                    junit(
                        testResults: 'reports/results.xml',
                        allowEmptyResults: true
                    )

                } else {

                    echo 'JUnit results not found. Skipping JUnit publishing.'
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
        // SUCCESS
        // ------------------------------------------

        success {

            echo "=========================================="
            echo "PLAYWRIGHT API TESTS PASSED"
            echo "Environment : ${params.TEST_ENV}"
            echo "Build       : #${env.BUILD_NUMBER}"
            echo "=========================================="
        }


        // ------------------------------------------
        // FAILURE
        // ------------------------------------------

        failure {

            echo "=========================================="
            echo "PLAYWRIGHT API TESTS FAILED"
            echo "Environment : ${params.TEST_ENV}"
            echo "Build       : #${env.BUILD_NUMBER}"
            echo "Check Jenkins console output and reports."
            echo "=========================================="
        }
    }
}