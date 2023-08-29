// to add to leaderboard
export const uselead = async ({ user, score, ExamName }) => {
    const rank = { user, score, ExamName }
    // we send the user the user score and name of exam attempted
    await fetch('http://localhost:8080/api/get/test/post/leaderboard',
        {
            method: 'POST',
            body: JSON.stringify(rank),
            headers: { 'Content-Type': 'application/json' }
        })

}