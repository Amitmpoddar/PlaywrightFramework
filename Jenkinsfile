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

        TEST_ENV = "${params.TEST_ENV}"
        ENV = "${params.TEST_ENV}"

        BROWSER = 'chromium'
        HEADLESS = 'true'

        DEFAULT_TIMEOUT = '60000'
        EXPECT_TIMEOUT = '10000'

        AUTH_URL = 'https://dummyjson.com/auth/login'

        CLIENT_ID = 'not-used'
        CLIENT_SECRET = 'not-used'
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
        // Stage 4 - Install Playwright Browser
        // ==========================================

        stage('Install Playwright Browser') {

            steps {

                sh '''
                    npx playwright install chromium
                '''
            }
        }


        // ==========================================
        // Stage 5 - Run UI + API Tests in Parallel
        // ==========================================

        stage('Run Tests in Parallel') {

            parallel {


                // ==================================
                // UI Tests
                // ==================================

                stage('UI Tests') {

                    steps {

                        withCredentials([
                            usernamePassword(
                                credentialsId: 'api-test-user',
                                usernameVariable: 'TEST_USERNAME',
                                passwordVariable: 'TEST_PASSWORD'
                            )
                        ]) {

                            sh '''
                                REPORT_PREFIX=ui \
                                npx playwright test --project=chromium
                            '''
                        }
                    }
                }


                // ==================================
                // API Tests
                // ==================================

                stage('API Tests') {

                    steps {

                        withCredentials([
                            usernamePassword(
                                credentialsId: 'api-test-user',
                                usernameVariable: 'TEST_USERNAME',
                                passwordVariable: 'TEST_PASSWORD'
                            )
                        ]) {

                            sh '''
                                REPORT_PREFIX=api \
                                npx playwright test --project=api
                            '''
                        }
                    }
                }
            }
        }
    }


    // ==========================================
    // Post Build
    // ==========================================

    post {

        // ==========================================
        // ALWAYS
        // ==========================================

        always {


            // --------------------------------------
            // JUnit Results
            // --------------------------------------

            script {

                if (fileExists('reports')) {

                    echo 'Publishing JUnit results...'

                    junit(
                        testResults: 'reports/**/results.xml',
                        allowEmptyResults: true,
                        skipPublishingChecks: true,
                        skipMarkingBuildUnstable: true,
                        skipMarkingStageUnstable: true
                    )

                } else {

                    echo 'JUnit results not found. Skipping JUnit publishing.'
                }
            }


            // --------------------------------------
            // Allure Report
            // --------------------------------------

            script {

                if (
                    fileExists('allure-results/ui') ||
                    fileExists('allure-results/api')
                ) {

                    echo 'Publishing Allure report...'

                    allure(
                        includeProperties: false,
                        resultPolicy: 'LEAVE_AS_IS',
                        results: [
                            [path: 'allure-results/ui'],
                            [path: 'allure-results/api']
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


        // ==========================================
        // SUCCESS
        // ==========================================

        success {

            echo "=========================================="
            echo "PLAYWRIGHT UI + API TESTS PASSED"
            echo "Environment : ${params.TEST_ENV}"
            echo "Build       : #${env.BUILD_NUMBER}"
            echo "=========================================="
        }


        // ==========================================
        // FAILURE
        // ==========================================

        failure {

            echo "=========================================="
            echo "PLAYWRIGHT UI + API TESTS FAILED"
            echo "Environment : ${params.TEST_ENV}"
            echo "Build       : #${env.BUILD_NUMBER}"
            echo "Check Jenkins console output and reports."
            echo "=========================================="
        }
    }
}