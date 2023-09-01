// to add to leaderboard
export const uselead = async ({ user, score, ExamName }) => {
    const rank = { user, score, ExamName }
    const Url = process.env.REACT_APP_API_URL
    // we send the user the user score and name of exam attempted
    await fetch(`${Url}/api/get/test/post/leaderboard`,
        {
            method: 'POST',
            body: JSON.stringify(rank),
            headers: { 'Content-Type': 'application/json' }
        })

}