
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

