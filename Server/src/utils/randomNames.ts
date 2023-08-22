export const generateRandomUsername = () => {
    let professionNames = [
        'Astronaut', 'Artist', 'Engineer', 'Doctor', 'Mathematician', 
        'Baker', 'Lawyer', 'Writer', 'Detective', 'Designer', 'Astronomer',
        'Programmer', 'Businessman', 'Journalist', 'Librarian', 'Photographer',
        'Scientist', 'Teacher'
    ]

    let adjectives = [
        'Adventurous', 'Decisive', 'Creative', 'Nice', 'Observant', 'Non-judgemental',
        'Self-confident', 'Shy', 'Sincere', 'Smart', 'Ambitious', 'Hardworking', 'Helpful',
        'Honest', 'Humorous', 'Imaginative', 'Patient', 'Persistent', 'Pioneering',
        'Philosophical', 'Efficient', 'Bright','Polite', 'Charismatic', 'Charming',
        'Calm', 'Kind', 'Intuitive', 'Pro-active', 'Versatile', 'Lucky', 'Clever', 'Organized',
        'Dynamic', 'Practical', 'Friendly', 'Modest',
    ]

    const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomProfession = professionNames[Math.floor(Math.random() * professionNames.length)];
    const randomNumber = Math.floor(Math.random() * 1000);

    const username = `${randomAdjective}-${randomProfession}-${randomNumber}`

    return username
}