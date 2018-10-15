var fetch_code =	async(loginName) => {
    var x = document.getElementById("mySelect").selectedIndex;
    var sel_name = document.getElementsByTagName("option")[x].value;
    console.log(sel_name);
    var repo_name;
    if(sel_name === "Java"){
        repo_name = "caveofprogramming/java-beginners";
    }  
    if(sel_name === "PHP"){
        repo_name = "robbyrussell/oh-my-zsh"; 
    }  
    if(sel_name === "HTML"){
        repo_name = "h5bp/html5-boilerplate"; 
    }  
    if(sel_name === "Ruby"){
        repo_name = "ruby/ruby"; 
        console.log(repo_name);
    }  
    if(sel_name === "C#"){
        repo_name = "grpc/grpc"; 
    }  
    if(sel_name === "CSS"){
        repo_name = "airbnb/css"; 
    }  
    if(sel_name === "C++"){
        repo_name = "grpc/grpc"; 
    }  
    if(sel_name === "TypeScript"){
        repo_name = "DefinitelyTyped/DefinitelyTyped"; 
    }  
    if(sel_name === "JavaScript"){
        repo_name = "airbnb/javascript"; 
    }   
    var code_keyWord = document.querySelector("#keyword").value;
    var parent = document.getElementById("parent");
    var child = document.getElementById("example");
    var xyz = document.getElementById("example_wrapper");
    
    
    child.remove();
    if(xyz)
   {
       xyz.remove(); 
   }
    $('#example').DataTable( {});
    var para = document.createElement("table");
    document.getElementsByTagName("table")[0].setAttribute("id", "example"); 
    parent.appendChild(para);
    if(sel_name !== "Select Language"){
        try {
            var response = await fetch(`https://api.github.com/search/code?q=${code_keyWord}+in:file+language:${sel_name}+repo:${repo_name}` , { headers: {
                "Accept": "application/vnd.github.v3.text-match+json"
            }});
            var json = await response.json();
            //var followerList = json.map(user => user.login);
            console.log(json);
            var temp1 = json;
            var newArr2 = [];
            for(i=0;i<temp1.items.length;i++){
                var newArr = [];
                newArr.push(temp1.items[i].text_matches[0].matches[0].text);
                newArr.push(temp1.items[i].text_matches[0].fragment);
                newArr.push(temp1.items[i].text_matches[0].matches[0].indices[0]);
                newArr.push(temp1.items[i].name	);
                newArr.push(temp1.items[i].html_url);

                newArr2.push(newArr);

            }
            console.log(newArr2)
            $('#example').DataTable( {
                data: newArr2,
                columns: [
                    { title: "Keyword" },
                    { title: "Code" },
                    { title: "First match" },
                    { title: "file" },
                    { title: "URL" }
                ]
            });
        } catch(e) {
            console.log("Data didn't load", e);
        }
    }
    else{
        document.getElementById("message_code").innerHTML = "Please Select language.";
        setTimeout(function(){document.getElementById("message_code").innerHTML = "";},3000);

    }
}

var fetch_repo =	async() => {
    const topic = document.querySelector("#topic").value;
    var parent = document.getElementById("parent");
    var child = document.getElementById("example");
    var xyz = document.getElementById("example_wrapper");
    
    child.remove();
    if(xyz)
    {
       xyz.remove(); 
    }
    $('#example').DataTable( {});
    var para = document.createElement("table");
    document.getElementsByTagName("table")[0].setAttribute("id", "example"); 
    parent.appendChild(para);
    if(topic!==''){
        try {
            var response = await fetch(`https://api.github.com/search/repositories?q=topic:${topic}`);
            var json = await response.json();
            //var followerList = json.map(user => user.login);
            console.log(json);
            var temp1 = json;
            var newArr2 = [];
            for(i=0;i<temp1.items.length;i++){
                var newArr = [];
                newArr.push(temp1.items[i].full_name);
                newArr.push(temp1.items[i].html_url);

                newArr.push(temp1.items[i].owner.login);
                newArr.push(temp1.items[i].owner.type	);


                newArr2.push(newArr);

            }
            console.log(newArr2)
            $('#example').DataTable( {
                data: newArr2,
                columns: [
                    { title: "Repo Name" },
                    { title: "URL" },
                    { title: "Owner" },
                    { title: "Type" }
                ]
            });
        } catch(e) {
            console.log("Data didn't load", e);
        }
    }else{
        document.getElementById("message_repo").innerHTML = "Please enter name of repo.";
        setTimeout(function(){document.getElementById("message_repo").innerHTML = "";},3000);
    }
}

var fetch_users =	async() => {
    const repo_name = document.querySelector("#repo_name").value;
    console.log(repo_name);
    var parent = document.getElementById("parent");
      var child = document.getElementById("example");
      var xyz = document.getElementById("example_wrapper");

      child.remove();
      if(xyz)
       {
           xyz.remove(); 
       }
      $('#example').DataTable( {});
      var para = document.createElement("table");
      document.getElementsByTagName("table")[0].setAttribute("id", "example"); 
      parent.appendChild(para);
    if(repo_name!==''){
       try {
        var response = await fetch(`https://api.github.com/search/users?q=${repo_name}+repos:%3E5+followers:%3E3`, { headers: {
            "Accept": "application/vnd.github.v3.text-match+json"
        }});
        var json = await response.json();
        var newArr2 = [];
        //var followerList = json.map(user => user.login);
        //console.log(json);
        var temp1  = json;
        
        console.log(temp1.items.length)
        for(i=0;i<temp1.items.length;i++){
            var newArr = [];
            newArr.push(temp1.items[i].text_matches[0].fragment);
            newArr.push(temp1.items[i].login);

            newArr.push(temp1.items[i].html_url);

            newArr2.push(newArr);
        }
        //console.log(newArr2);
        $('#example').DataTable( {
            data: newArr2,
            columns: [
                { title: "Name" },
                { title: "Username" },
                { title: "URL" },
                //{ title: "Email" }
            ]
        });
      } catch(e) {
        console.log("Data didn't load", e);
        }
    }
    else{
        document.getElementById("message_user").innerHTML = "Please enter name of user.";
        setTimeout(function(){document.getElementById("message_user").innerHTML = "";},3000);
    }
}




