# LavanyaLambda

Step1: First install playwright using following command in VS code terminal "npm init playwright@latest"
Step2: Install edge browser using following command in vs code terminal "npx playwright install msedge" 
Step3: Delete all the files in tests and tests-examples folders
Step4: Comment all the browsers in config file except chromium and edge 
Step5: Add this timeout in config file- expect: { timeout: 10000 }, timeout: 100*1000,
Step6: Ensure that the fully parallel is true in config file. 
Step7: Paste the LambdaScenario.spec.ts file inside tests folder. 
Step8: Run the test using following comment "npx playwright test"
