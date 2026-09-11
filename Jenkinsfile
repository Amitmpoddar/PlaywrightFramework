pipeline {

    agent any

    environment {

        TEST_ENV = 'qa'

        ENV = 'qa'
        BASE_URL = 'https://practice-automation.com/'
        API_BASE_URL = 'https://dummyjson.com'

        BROWSER = 'chromium'
        HEADLESS = 'true'

        DEFAULT_TIMEOUT = '30000'
        EXPECT_TIMEOUT = '10000'

        AUTH_URL = 'https://dummyjson.com/auth/login'

        // Not currently used by DummyJSON
        CLIENT_ID = 'not-used'
        CLIENT_SECRET = 'not-used'
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