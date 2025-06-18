import React, { useState} from "react";
import '../styles/App.css';


const App = () =>{
    const [name1, setName1] = useState('');
    const [name2, setName2] = useState('');
    const [result, setResult] = useState('');

    const handleName1 = (value) =>{
        setName1(value);
    }
    const handleName2 = (value) =>{
        setName2(value);
    }
    const handleClear = () =>{
        setName1('');
        setName2('');
        setResult('');
    }

    function isAlphabetic(str) {
        return /^[A-Za-z]+$/.test(str);
    }

    const flames = [
        "Siblings",
        "Friends",
        "Love",
        "Affection",
        "Marriage",
        "Enemy"
    ];

    function stringComparision(name1, name2){
        const map1 = new Map();
        const map2 = new Map();
        const str1 = name1.toLowerCase();
        const str2 = name2.toLowerCase();

        for(let char of str1){
            map1.set(char, (map1.get(char) || 0)+1);
        }
        for(let char of str2){
            map2.set(char, (map2.get(char) || 0)+1);
        }

        for(let [char, count1] of map1){
            if(map2.has(char)){
                const count2 = map2.get(char);
                const minCount = Math.min(count1,count2);
                map1.set(char, count1-minCount)
                map2.set(char, count2-minCount)
            }
        }

        let distinctChar = 0;
        for(let [char, count] of map1){
            distinctChar += count;
        }
        for(let [char, count] of map2){
            distinctChar += count;
        }
        return distinctChar%6;
        
    }

    const relationship = () =>{
        if(isAlphabetic(name1) && isAlphabetic(name2) &&name1.length > 0 && name2.length>0 ){
            const ans = stringComparision(name1, name2);
            setResult(flames[ans]);
        }
        else{
            setResult("Please Enter valid input");
        }
    }


    return(
        <div id="main">
            <input type="text"
                data-testid="input1"
                name="name1"
                value={name1}
                onChange={(e) => handleName1(e.target.value)}
                placeholder="Enter first name"
            />
            <input 
                data-testid="input2"
                name="name2"
                value={name2}
                onChange={(e) => handleName2(e.target.value)}
                placeholder="Enter second name"
            />
            <button 
                data-testid="calculate_relationship"
                name="calculate_relationship"
                onClick={relationship}
            >Claculate Relationship future</button>
            <button 
                onClick={handleClear}
                data-testid="clear"
                name="clear"
            >Clear</button>
            <div>
                <h3 data-testid="answer">{result}</h3>
            </div>
        </div>
    )
    
}


export default App;
