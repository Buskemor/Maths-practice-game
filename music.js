window.onload = ()=>{
    let previousNoteElem = document.getElementById('previous-note');
    let currentNoteElem = document.getElementById('current-note');
    const correctOrIncorrectElem = document.getElementById('correct-or-incorrect');
    // const submitElem = document.getElementById('submit');
    
    class Note {
        constructor(note, noteType) {
            this.note = note;
            this.noteType = noteType;      
        }
    }
    
    
    let noteNames = ["C", "D", "E", "F", "G", "A", "B"]
    let noteTypes = ["flat", "natural", "sharp"]
    let notes = []
    for(note of noteNames) {
        for(noteType of noteTypes) {
            notes.push(new Note(note, noteType))
        }
    }
    
    let currentNote = generateRandomNote();
    let previousNote = generateRandomNote();
    
    while(currentNote === previousNote)
        currentNote = generateRandomNote();

    currentNoteElem.innerHTML = currentNote
    previousNoteElem.innerHTML = previousNote;

    document.addEventListener("keydown", ()=> {
        if (event.key === "ArrowUp") {
            removeTutorial();

            console.log("up")
            if(noteNames.indexOf(currentNote) > noteNames.indexOf(previousNote)) {
                console.log("CORRECT!")
                correctOrIncorrectElem.innerHTML = "correct!"
                new Audio("kenneth1.mp3").play();
            } else {
                console.log("INCORRECT!")
                correctOrIncorrectElem.innerHTML = "incorrect.."
                new Audio("kenneth2.mp3").play();
            }
            logIndexes()

            updateNotes()
        }


        if (event.key === "ArrowDown") {
            removeTutorial();
            console.log("down")
            if(noteNames.indexOf(currentNote) < noteNames.indexOf(previousNote)) {
                console.log("CORRECT!")
                correctOrIncorrectElem.innerHTML = "correct!"
                new Audio("kenneth1.mp3").play();
            } else {
                console.log("INCORRECT!")
                correctOrIncorrectElem.innerHTML = "incorrect.."
                new Audio("kenneth2.mp3").play();
            }
            
            logIndexes()
            updateNotes()
        }
    });

    function removeTutorial() {
        document.querySelectorAll('h3').forEach(element => {
            element.remove()
        });
    }

    function logIndexes() {
        console.log(noteNames.indexOf(previousNote))
        console.log(previousNote)
        console.log("")
        console.log(noteNames.indexOf(currentNote))
        console.log(currentNote)
    }

    function updateNotes() {
        previousNote = currentNote
        previousNoteElem.innerHTML = currentNote;
        currentNote = generateRandomNote();
  

        while(currentNote === previousNote)
            currentNote = generateRandomNote();
        currentNoteElem.innerHTML = currentNote;
    }

    function generateRandomNote() {
        return noteNames[Math.floor(Math.random() * noteNames.length)];
    }
}




