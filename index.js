document.querySelector('.rock-js-button').addEventListener('click',()=>
{
    playGame('rock');
})

document.querySelector('.paper-js-button').addEventListener('click',()=>
{
    playGame('paper');
});

document.querySelector('.scissor-js-button').addEventListener('click',()=>
{
    playGame ('scissor');
});

function resetScore()
{
    scores.Wins = 0 ,
    scores.Looses = 0,
    scores.Ties = 0,
    localStorage.removeItem('scores');
    updateScore();
}

document.querySelector('.reset-button').addEventListener('click',()=>
{
    resetConfirm();
});

document.querySelector('.auto-play-button').addEventListener('click',()=>
{
    autoplay();
})



document.body.addEventListener('keydown',(event)=>
{
    if (event.key === 'r')
    {
        playGame('Rock');
    }
    else if (event.key === 'p')
    {
        playGame('Paper');
    }
    else if (event.key === 's')
    {
        playGame('Scissor')
    }
    else if (event.key === 'a')
    {
        autoplay();
    }
    else if (event.key==='Backspace')
    {
        resetConfirm();

    }
})


let scores = JSON.parse(localStorage.getItem('scores')) ||
{
    Wins : 0 ,
    Looses : 0,
    Ties : 0,
}

let intervalId;
let isAutoPlaying = false;
function autoplay()
{
    if (!isAutoPlaying)
    {
       intervalId = setInterval(()=>
        {
            const playerMove = pickComputerMove();
            playGame(playerMove);
        },1000);
        document.querySelector('.auto-play-button').innerHTML = 'Stop Playing';
        isAutoPlaying = true;
    }
    else
    {
        clearInterval(intervalId);
        isAutoPlaying = false;
        document.querySelector('.auto-play-button').innerHTML = 'Auto Play';
    }

}


function pickComputerMove()
{
    let computerMove = '';
    const randomNumber = Math.random();

    if (randomNumber >= 0 && randomNumber < 1/3)
    {
        computerMove = 'rock';
    }

    else if (randomNumber >= 1/3 && randomNumber < 2/3)
    {
        computerMove = 'paper';
    }
    
    else if (randomNumber >= 2/3 && randomNumber < 1)
    {
        computerMove = 'scissor';
    }
    return computerMove;
}

function playGame(playerMove)
{
    let result = '';
    let computerMove = pickComputerMove();

    if (playerMove === 'rock')
    {
        if (computerMove === 'rock')
        {
            result = 'Tie';
        }
        else if (computerMove === 'paper')
        {
            result = 'You Lose';
        }
        else if (computerMove === 'scissor')
        {
            result = 'You Win';
        }
    }

    else if (playerMove === 'paper')
    {
        if (computerMove === 'rock')
        {
            result = 'You Win';
        }
        else if (computerMove === 'paper')
        {
            result = 'Tie';
        }
        else if (computerMove === 'scissor')
        {
            result = 'You Lose';
        }
    }

    else if (playerMove === 'scissor')
    {
        if (computerMove === 'rock')
        {
            result = 'You Lose';
        }
        else if (computerMove === 'paper')
        {
            result = 'You Win';
        }
        else if (computerMove === 'scissor')
        {
            result = 'Tie';
        }
    }
    if (result === 'You Win')
    {
        scores.Wins++;
    }
    else if (result === 'You Lose')
    {
        scores.Looses++;
    }
    else if (result === 'Tie')
    {
        scores.Ties++;
    }
    updateScore();

    localStorage.setItem('scores',JSON.stringify(scores));


    document.querySelector('.js-result').innerHTML = result;
    document.querySelector('.js-move').innerHTML = `You Pick <img src="./rock/${playerMove}-emoji.png">Computer Pick <img src="./rock/${computerMove}-emoji.png">`;
}

function updateScore()
{
    document.querySelector('.js-score').innerHTML = `Wins : ${scores.Wins} Looses : ${scores.Looses} Ties : ${scores.Ties}`
}

document.querySelector('.reset-confirm').addEventListener('click',()=>
{
    resetConfirm();
})

function resetConfirm()
{
    document.querySelector('.js-reset-confirmation').innerHTML = 
    `Are you sure to delete scores?
    <div class="reset-button-container">
    <button class="reset-confirm-yes">
    Yes
    </button>
    <button class="reset-confirm-no">
    No
    </button></div>
`;

    document.querySelector('.reset-confirm-yes').addEventListener('click',()=>
    {
        resetScore();
        hideResetConfirmation();
    })

    document.querySelector('.reset-confirm-no').addEventListener('click',()=>
    {
        hideResetConfirmation();
    })
}

function hideResetConfirmation()
{
    document.querySelector('.js-reset-confirmation').innerHTML = '';
}
