document.addEventListener('DOMContentLoaded', () => {
    //fetch the data from http://localhost:3000/dogs
    fetch("http://localhost:3000/dogs").then((response) => response.json()).
    then(function(response){
        //console.log("response = " + response);
        //debugger;

        //the data should be loaded into a table
        let mydogs = response;
        for (let n = 0; n < mydogs.length; n++)
        {
            //console.log("mydogs[" + n + "] = " + mydogs[n]);
            //console.log("mydogs[" + n + "].id = " + mydogs[n].id);
            //console.log("mydogs[" + n + "].name = " + mydogs[n].name);
            //console.log("mydogs[" + n + "].breed = " + mydogs[n].breed);
            //console.log("mydogs[" + n + "].sex = " + mydogs[n].sex);
            let myrw = document.createElement("tr");
            let mynm = document.createElement("td");
            let mybd = document.createElement("td");
            let mysx = document.createElement("td");
            let mybtncntr = document.createElement("td");
            let mybtn = document.createElement("button");
            myrw.id = mydogs[n].id;
            mynm.textContent = "" + mydogs[n].name;
            mybd.textContent = "" + mydogs[n].breed;
            mysx.textContent = "" + mydogs[n].sex;
            mybtn.textContent = "Edit Dog";
            mybtncntr.appendChild(mybtn);
            myrw.appendChild(mynm);
            myrw.appendChild(mybd);
            myrw.appendChild(mysx);
            myrw.appendChild(mybtncntr);
            document.getElementById("table-body").appendChild(myrw);
        }//end of n for loop
        //console.log("successfully added all of the dogs to the table!");
        //debugger;

        let myfrm = document.getElementById("dog-form");
        let mycallerrwid = -1;
        for (let n = 0; n < mydogs.length; n++)
        {
            let mybtn = document.getElementById(mydogs[n].id).
                getElementsByTagName("button")[0];
            //console.log("mybtn = " + mybtn);
            mybtn.addEventListener("click", function(event){
                //console.log("btn clicked!");
                //console.log("OLD mycallerrwid = " + mycallerrwid);
                //console.log("this.parentNode.parentNode = " + this.parentNode.parentNode);
                //console.log("this.parentNode.parentNode.id = " +
                //    this.parentNode.parentNode.id);
                let myinitdatands = this.parentNode.parentNode.getElementsByTagName("td");
                let mynm = myinitdatands[0].textContent;
                let mybd = myinitdatands[1].textContent;
                let mysx = myinitdatands[2].textContent;
                //console.log("mynm = " + mynm);
                //console.log("mybd = " + mybd);
                //console.log("mysx = " + mysx);
                //debugger;
                
                //now get the form and pass the values into it
                //set the values of each of the inputs on the form here
                let myinpts = myfrm.getElementsByTagName("input");
                myinpts[0].value = mynm;
                myinpts[1].value = mybd;
                myinpts[2].value = mysx;
                mycallerrwid = this.parentNode.parentNode.id;
                //console.log("NEW mycallerrwid = " + mycallerrwid);
                //console.log("successfully saved the initial data to the form!");
                //debugger;
            }.bind(mybtn));
        }//end of n for loop
        //console.log("successfully added the edit buttons functions!");
        //debugger;

        myfrm.addEventListener("submit", function(event){
            event.preventDefault();
            //console.log("form submitted!");
            //console.log("mycallerrwid = " + mycallerrwid);
            let myinitdatands = document.getElementById(mycallerrwid).
                getElementsByTagName("td");
            let mynm = myinitdatands[0].textContent;
            let mybd = myinitdatands[1].textContent;
            let mysx = myinitdatands[2].textContent;
            //console.log("the old data:");
            //console.log("mynm = " + mynm);
            //console.log("mybd = " + mybd);
            //console.log("mysx = " + mysx);

            //take the input data and save it to the same row that called edit
            //need to somehow figure out which button called the form in the first place
            //get the input from the form and then save it
            //console.log("data from the form:");
            //console.log("event.target = " + event.target);
            //console.log("event.target[0].name = " + event.target[0].name);
            //console.log("event.target[0].value = " + event.target[0].value);
            //console.log("event.target[1].name = " + event.target[1].name);
            //console.log("event.target[1].value = " + event.target[1].value);
            //console.log("event.target[2].name = " + event.target[2].name);
            //console.log("event.target[2].value = " + event.target[2].value);
            let mynwnm = event.target[0].value;
            let mynwbd = event.target[1].value;
            let mynwsx = event.target[2].value;
            //console.log("mynwnm = " + mynwnm);
            //console.log("mynwbd = " + mynwbd);
            //console.log("mynwsx = " + mynwsx);
            
            //first make sure that the data actually changed
            //if it did not change, do not contact the server
            //need to save the data to the server 
            //then after the data is saved to the server update the table
            //and reset the form
            
            let makesrvercall = false;
            if (mynm === mynwnm)
            {
                if (mybd === mynwbd)
                {
                    if (mysx === mynwsx);
                    else makesrvercall = true;
                }
                else makesrvercall = true;
            }
            else makesrvercall = true;
            //console.log("makesrvercall = " + makesrvercall);

            if (makesrvercall)
            {
                const configobj = {
                    method: "PATCH",
                    headers: {
                        "Content-Type" : "application/json",
                        "Accept" : "application/json"
                    },
                    body: JSON.stringify({
                        name: mynwnm,
                        breed: mynwbd,
                        sex: mynwsx
                    })
                };
                fetch("http://localhost:3000/dogs/" + mycallerrwid, configobj).
                then((response) => response.json()).
                then(function(response){
                    //console.log("response = " + response);
                    let myresnm = response.name;
                    let myresbd = response.breed;
                    let myressx = response.sex;
                    //console.log("myresnm = " + myresnm);
                    //console.log("myresbd = " + myresbd);
                    //console.log("myressx = " + myressx);
                    
                    //save it to the table and then clear the form
                    myinitdatands[0].textContent = myresnm;
                    myinitdatands[1].textContent = myresbd;
                    myinitdatands[2].textContent = myressx;
                    //console.log("successfully saved the data to the table!");
                    
                    let myinpts = myfrm.getElementsByTagName("input");
                    myinpts[0].value = "";
                    myinpts[1].value = "";
                    myinpts[2].value = "";
                    //console.log("successfully cleared the form!");
                    //console.log("done processing the form data! It succeeded!");
                    //debugger;
                }).
                catch(function(err){
                    console.error("there was a problem updating the data on the server!");
                    console.error(err);
                });
            }
            //else console.log("successfully processed the form data!");
            //debugger;
        });
        //console.log("successfully added the submit listener to the form!");
        //debugger;
    }).catch(function(err){
        console.error("there was an error getting the data!");
        console.error(err);
    });
});
