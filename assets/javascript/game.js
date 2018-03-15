var got = {
    wlist: [["stark", "jon snow", "direwolf", "winterfell", "ghost"],
    ["targaryen", "daenerys", "viserion", "stormborn", "rhaegal"],
    ["casterly rock", "lannister", "cersei", "tyrion", "joffrey"],
    ["kraken", "greyjoy", "pyke", "iron islands", "theon"],
    ["dothraki", "drogo", "khlasar", "khaleesi", "arakhs"],
    ["mormont", "jorah", "bear island", "lyanna", "longclaw"]],
    imgwin:[["jsw.gif","jswin.gif","jswg.gif","jsw.gif","jswg.gif"],
    ["dtd.gif","dtw.gif","fire.gif","dtw.gif","dtf.gif"],
    ["cll.gif","fire.gif","jjj.gif","tlw.gif","jjj.gif"],
    ["tgw.gif","tgwin.gif","ygw.gif","tgwin.gif","ygw.gif"],
    ["kdw.gif","kdwn.gif","kdw.gif","dtd.gif","kdwn.gif"],
    ["lmw.gif","jmw.gif","jmww.gif","lmw.gif","lcmw.gif"]],
    imglos:[["jsdth.gif","wdw.gif","nk.gif","vfi.gif","jsdth.gif"],
    ["dt.gif","vfi.gif","wdw.gif","dt.gif","vfi.gif"],
    ["cld.gif","clpip.gif","jlw.gif","jlc.gif","cld.gif"],
    ["tgl.gif","egw.gif","tgl.gif","egw.gif","tgl.gif"],
    ["kdl.gif","kdl.gif","kdl.gif","kdww.gif","kdl.gif"],
    ["nk.gif","wdw.gif","vfi.gif","nk.gif","wdw.gif"]],
    ngsleft: 6,
    ngmwon: 0,
    ngmlos: 0,
    wronglist: [],
    rightlist: [],
    word: [],
    houseInd: -1,
    wrdInd: -1,
    wordset: function () {
        this.houseInd = Math.floor(Math.random() * this.wlist.length);
        this.wrdInd = Math.floor(Math.random() * this.wlist[0].length);
        this.word = this.wlist[this.houseInd][this.wrdInd].split("");
        var hword = this.wlist[this.houseInd][this.wrdInd].replace(/\S/g, "_");
        document.getElementById("hmword").textContent = hword;
        document.getElementById("startbut").textContent = "Fire and Blood ...";
    },
    evalGuess: function (uinp) {
        if (this.wronglist.concat(this.rightlist).indexOf(uinp) === -1 && uinp.match(/[a-z]/i) && uinp.length===1) {
            if (this.word.indexOf(uinp) > -1) {
                var indices =[];
                var idx = this.word.indexOf(uinp);
                while (idx != -1){      
                    indices.push(idx);
                    idx=this.word.indexOf(uinp, idx + 1);
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
                    document.getElementById("startbut").textContent = "You win !!! ..."  ;
                    document.getElementById("dispImg").style.filter = "blur(0px)";
                    document.getElementById("dispImg").src = "assets/images/" + this.imgwin[this.houseInd][this.wrdInd];
                    document.getElementById("aud2").play();
                    fthis=this;              
                    setTimeout(function(){fthis.resetgm();document.getElementById("aud2").pause();},9000);                  
                } 
            }   
            else {
                this.wronglist.push(uinp);
                
                document.getElementById("guesslist").textContent = this.wronglist.join();
                this.ngsleft--;                
                document.getElementById("nguessleft").textContent = this.ngsleft;
                document.getElementById("dispImg").style.filter = "blur(" + (7-this.ngsleft) + "px)";
                if (this.ngsleft < 3) {
                    document.getElementById("nguessleft").style.color="red";
                    document.getElementById("nguessleft").style.fontSize="2rem";                    
                }
                if (this.ngsleft === 0) {
                    this.ngmlos++;
                    document.getElementById("nloss").textContent = this.ngmlos;
                    document.getElementById("startbut").textContent = "You Loose !!! ..."  ;
                    document.getElementById("hmword").textContent=this.word.join("");
                    document.getElementById("hmword").style.color="red";
                    document.getElementById("dispImg").style.filter = "blur(0px)"
                    document.getElementById("dispImg").src = "assets/images/" + this.imglos[this.houseInd][this.wrdInd];
                    document.getElementById("aud3").play();
                    fthis=this;
                    setTimeout(function(){fthis.resetgm();document.getElementById("aud3").pause();},7000);
                }
            }

        }
    },
    resetgm: function() {
        this.ngsleft=6;
        this.wronglist= [];
        this.rightlist= [];
        document.getElementById("nguessleft").textContent = this.ngsleft;
        document.getElementById("guesslist").textContent = "...";            
        got.wordset();
        document.getElementById("dispImg").src = "assets/images/js.gif"
        document.getElementById("hmword").style.color="rgb(199, 199, 197)";
        document.getElementById("nguessleft").style.color="rgb(199, 199, 197)";
        document.getElementById("nguessleft").style.fontSize="1.4rem";
        document.getElementById("dispImg").style.filter = "blur(0px)"
    }    


}

// clicking the button starts it
document.getElementById("startbut").addEventListener("click", function _rungm(){ 
    document.getElementById("aud1").play();
    document.getElementById("startbut").style.fontSize = "2.5rem";
    document.getElementById("startbut").style.color = "red";
    got.wordset(); // select the word randomly form 2-D array & generate and display the hidden outline of the word\   
    document.onkeyup = function(e) { // let the user guess letters & after user press the guessed letter key, evaluate the guess
        uinp = e.key.toLowerCase();        
         got.evalGuess(uinp); // if user guessed correctly or failed game restarts automatically
    }    
    document.getElementById("startbut").removeEventListener("click", _rungm)
});





