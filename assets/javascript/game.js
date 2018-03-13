var got = {
    wlist: [["stark", "jon snow", "direwolf", "winterfell", "ghost"],
    ["targaryen", "daenerys", "viserion", "stormborn", "rhaegal"],
    ["casterly rock", "lannister", "cersei", "tyrion", "joffrey"],
    ["kraken", "greyjoy", "pyke", "iron islands", "theon"],
    ["dothraki", "drogo", "khlasar", "khaleesi", "arakhs"],
    ["mormont", "jorah", "bear island", "lyanna", "longclaw"]],
    ngsleft: 6,
    ngmwon: 0,
    ngmlos: 0,
    wronglist: [],
    rightlist: [],
    word: [],
    houseInd: -1,
    wrdInd: -1,
    wordset: function () {
        this.houseInd = Math.floor(Math.random() * (this.wlist.length - 1));
        this.wrdInd = Math.floor(Math.random() * (this.wlist[0].length - 1));
        this.word = this.wlist[this.houseInd][this.wrdInd].split("");
        var hword = this.wlist[this.houseInd][this.wrdInd].replace(/\S/g, "_");
        document.getElementById("hmword").textContent = hword;
    },
    evalGuess: function (uinp) {
        if (this.wronglist.concat(this.rightlist).indexOf(uinp) === -1) {
            if (this.word.indexOf(uinp) > -1) {
                var indices =[];
                var idx = this.word.indexOf(uinp);
                while (idx != -1){      
                    indices.push(idx);
                    console.log(idx);
                    idx=this.word.indexOf(uinp, idx + 1);
                    console.log(idx);
                };
                var wordup = document.getElementById("hmword").textContent.split("");
                indices.forEach(function (ii){
                    wordup[ii] = uinp;
                });                
                document.getElementById("hmword").textContent = wordup.join("");
                this.rightlist.push(uinp)
                if (document.getElementById("hmword").textContent.indexOf("_") === -1) {
                    this.ngmwon++;
                    document.getElementById("nwon").textContent = this.ngmwon;  
                    this.resetgm();                  
                } 
            }   
            else {
                this.wronglist.push(uinp)
                document.getElementById("guesslist").textContent = this.wronglist.join();
                this.ngsleft--;
                document.getElementById("nguessleft").textContent = this.ngsleft;
                if (this.ngsleft === 0) {
                    this.ngmlos++;
                    document.getElementById("nloss").textContent = this.ngmlos;
                    this.resetgm();
                }
            }

        }
    },
    resetgm: function() {
        this.ngsleft=6;
        this.wronglist= [];
        this.rightlist= [];
    }


}

// clicking the button starts it
document.getElementById("startbut").addEventListener("click", function(){ 
    got.wordset(); // select the word randomly form 2-D array & generate and display the hidden outline of the word
    console.log(got.word);
    document.onkeyup = function(e) { // let the user guess letters & after user press the guessed letter key, evaluate the guess
        uinp = e.key;
            got.evalGuess(uinp); // if user guessed correctly or failed game restarts automatically
    }
});





