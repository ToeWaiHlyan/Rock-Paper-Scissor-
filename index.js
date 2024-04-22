document.querySelector('.rock-js-button').addEventListener('click',()=>
{
    playGame('Rock');
})

document.querySelector('.paper-js-button').addEventListener('click',()=>
{
    playGame('Paper');
});

document.querySelector('.scissor-js-button').addEventListener('click',()=>
{
    playGame ('Scissor');
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
        computerMove = 'Rock';
    }

    else if (randomNumber >= 1/3 && randomNumber < 2/3)
    {
        computerMove = 'Paper';
    }
    
    else if (randomNumber >= 2/3 && randomNumber < 1)
    {
        computerMove = 'Scissor';
    }
    return computerMove;
}

function playGame(playerMove)
{
    let result = '';
    let computerMove = pickComputerMove();

    if (playerMove === 'Rock')
    {
        if (computerMove === 'Rock')
        {
            result = 'Tie';
        }
        else if (computerMove === 'Paper')
        {
            result = 'You Lose';
        }
        else if (computerMove === 'Scissor')
        {
            result = 'You Win';
        }
    }

    else if (playerMove === 'Paper')
    {
        if (computerMove === 'Rock')
        {
            result = 'You Win';
        }
        else if (computerMove === 'Paper')
        {
            result = 'Tie';
        }
        else if (computerMove === 'Scissor')
        {
            result = 'You Lose';
        }
    }

    else if (playerMove === 'Scissor')
    {
        if (computerMove === 'Rock')
        {
            result = 'You Lose';
        }
        else if (computerMove === 'Paper')
        {
            result = 'You Win';
        }
        else if (computerMove === 'Scissor')
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
    <button class="reset-confirm-yes">
    Yes
    </button>
    <button class="reset-confirm-no">
    No
    </button>`;

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