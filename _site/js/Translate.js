//Translation functions for OpenEpi
//Sept 2009 Translation functions moved to this separate module
//They were part of AppHelper.js
var Tlanguage="EN";
//var currlanguage = readCookie("openepi","Language");       //ReadCookie.js must be loaded first
var currlanguage=Language;
//alert("currlanguage in 6 of Translate="+currlanguage);

function browserLanguage()
{
	//Gets the language of the browser as a two-character,
	//upper-case standard Internet code, such as EN for English or ES for Spanish.
	//If none is found, a null string returns, probably indicating an unusual browser
 var ie=window.navigator.browserLanguage; //Works in IE
 var ns=window.navigator.language;     //Works in Netscape
 if (typeof(ie) != "undefined")
   {return ie.toUpperCase().substring(0,2)}
 else if (typeof (ns)!="undefined")
   {return ns.toUpperCase().substring(0,2)}
 else {return ""}
}


//var T=new Array();

function initTranslation(requestedLang)
{ if (requestedLang!=null)
  {
   currlanguage=requestedLang;
  }
  else
  {
  if (typeof(readCookie)!=null)
      {
        currlanguage = readCookie("openepi","Language");       //ReadCookie.js must be loaded first
      }
  }
  if ((currlanguage=="EN") || (currlanguage==""))
     {
       currlanguage="EN";
     }
   //	var currlanguage="";  //Set to language of settings
	var today= new Date();  //Mar 2007
	var month = today.getMonth() + 1 //apparently January is 0!!!   added these three lines August 2007
    var day = today.getDate()
    var year = today.getFullYear()

	//applabel=window.location.pathname;  //This will be written to the translation text file a single time and then reset to null.
	//Mar 2007 removed pathname, which does not work with IE7 and added date
	//applabel=window.location + "  "+ today.toLocaleString();	//Aug 2007 Changed to more concise version below
	applabel=window.location + "  "+ year +"/"+month+"/"+day;
	applabel=applabel.replace(/\//g,"\\");  //Converts forward slashes to backslashes
    applabel=applabel.replace(/file\:\\\\\\/,"");  //Takes out      'file:\\\'   Aug 2007--happens again in UpdateTranslation

   // alert(" 710 applabel="+applabel);
   //	if (typeof(Language)!=="undefined")
   //	  {
   //		currlanguage=Language;
   //	  }
ffmsg="If you are running OpenEpi in Firefox on local disk, enter ABOUT:CONFIG in Firefox's address bar.";
 ffmsg+=" Consent to the scary message. Find SECURITY.FILEURI.STRICT_ORIGIN_POLICY and double-click it ";
 ffmsg+=" to change the value to 'false'. This one-time setting restores Firefox 3.x Javascript function to that of "
 ffmsg+="Firefox 2.0 and other browsers."
 if (document.all)
 {
   //above tests to see if we are in IE browser (only)
 try
  {
	if (typeof(window.top.writelang)!=="undefined")
	  {
		// If updateTranslation is running, use the language specified by the user

        currlanguage=window.top.writelang;
		//alert("language set from TOP="+currlanguage);
	  }
  }
  catch(err)
  {
    alert(ffmsg);
  }
 }
	//alert("maxvalueatleft="+MaxValueAtLeft);
	//Changed following line Oct 2007
	// if (currlanguage.length==0 || currlanguage=="EN")
	 if ((currlanguage===null)||(currlanguage.length===0 ))
	  {
		   currlanguage=browserLanguage();
	  }
	//alert("currlanguage="+currlanguage);



 var transFile= "../Translations/"+currlanguage+".js"
 transFile="'"+transFile+"'";
 var tScript='<SCRIPT language=JavaScript src='+transFile+' type=text/JavaScript>' + '\</SC'+'RIPT>';
 //alert(tScript);
 document.write(tScript)



}

function visitTextNodes(n)
{   //n is the starting node, typically document.body for the first, pre-recursion call
    var txt;
	if(n.nodeType == 3)
	  {
	     n.nodeValue = n.nodeValue.replace( /\s{2,}/g," ");    //Convert 2 or more spaces to a single space
		                                                      // This cleans up large patches of  text that don't work as
															  // array indices in FireFox  Aug/2007

		 n.nodeValue=t(n.nodeValue);  //This actually does the translation
		 return
	  }
	for (var m=n.firstChild; m !=null; m=m.nextSibling)
	  {
	    visitTextNodes(m);
	  }
}

function translateHTML(doc)
{
	if ((doc==null) || (doc==window))
	  {doc = document.body}
   //	else
   //	  {doc = doc.body}
	//alert("106 in translateHTML")
	visitTextNodes(doc);
	return;
}


function t(origphrase)
{ //If the T array is defined, attempts to locate a translated phrase,
//using phrase as the index, and returns the result.
//If T[phrase] is undefined AND there is a function window.top.updateTranslation, it calls this function to write the T definition for this
//phrase into the translation file.
var phrase=origphrase;
return phrase;
}

initTranslation();
