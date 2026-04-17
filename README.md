# Project Q&A

## 1. What challenges were you trying to solve?
The biggest challenge was that the NASA API is unreliable and sometimes returns a 503. To handle this, I used caching to prevent empty responses and avoid showing broken pages due to lack of data.

## 2. What, if any, technical limitations were you working within?
The main technical limitation was the NASA API's 1000 requests-per-hour limit, though it wasn't a major issue at this scale. The API also occasionally returns 503 errors, so I used Next.js caching to serve stale data rather than breaking the page.

## 3. If you were collaborating with other developers, how did you separate the work?
I would split the work by feature and developer strength. In this case, one developer would handle the API and cookie logic, a second would handle the UI, and a third would focus on QA.

## 4. What did you enjoy about the project?
I enjoyed that the project addressed a real-world problem rather than being just another LeetCode puzzle.

## 5. What would you do differently if you could do it over?
I would use ISR instead of SSR from the start. I added Next.js caching as a fix for the issues I had with the NASA API, but since the Picture of the Day only updates once a day, ISR would have been the correct architecture from the beginning.