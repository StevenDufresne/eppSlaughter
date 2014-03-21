'use strict';

var app = angular.module('eppTestKillerApp')
  .controller('MainCtrl', function ($scope) {
  	$scope.data=[];

  	$scope.domainDetails = [
  		{
  			id: "domain-domain",
  			label: "Domain Name:",
  			initialValue: "sptestdomain",
  			currentValue: "sptestdomain"
  		},
  	  	{
  	  		id: "domain-tld",
  			label: "TLD:",
  			initialValue: "test",
  			currentValue: "test"
  		},	
  	  	{
  	  		id: "domain-ns1",
  			label: "Nameserver 1:",
  			initialValue: "n1.example.com",
  			currentValue: "n1.example.com"
  		},	
  	  	{
  	  		id: "domain-ns2",
  			label: "Nameserver 2:",
  			initialValue: "n2.example.com",
  			currentValue: "n2.example.com"
  		},		
   	  	{
   	  		id: "domain-pw",
  			label: "Password:",
  			initialValue: "2BARfoo",
  			currentValue: "2BARfoo"
  		}
  	]

  	$scope.contactDetails = [
  	  	{
  			id: "contact-name",
  			label: "Name:",
  			initialValue: "John Doe",
  			currentValue: "John Doe"
  		},
   	  	{
  			id: "contact-org",
  			label: "Org:",
  			initialValue: "Example Inc.",
  			currentValue: "Example Inc."
  		},
  		{
  			id: "contact-rant",
  			label: "Registrant:",
  			initialValue: "jd1234",
  			currentValue: "jd1234"
  		},
  	  	{
  	  		id: "contact-id",
  			label: "Contact Id:",
  			initialValue: "sh8013",
  			currentValue: "sh8013"
  		},	
  	  	{
  	  		id: "contact-street1",
  			label: "Street:",
  			initialValue: "124 Example Dr.",
  			currentValue: "124 Example Dr."
  		},	
  	  	{
  	  		id: "contact-street2",
  			label: "Street:",
  			initialValue: "Suite 200",
  			currentValue: "Suite 200"
  		},		
   	  	{
   	  		id: "contact-city",
  			label: "City:",
  			initialValue: "Dulles",
  			currentValue: "Dulles"
  		},		
   	  	{
   	  		id: "contact-province",
  			label: "State/Province:",
  			initialValue: "VA",
  			currentValue: "VA"
  		},		
   	  	{
   	  		id: "contact-pc",
  			label: "Zip/Postal:",
  			initialValue: "20166-6503",
  			currentValue: "20166-6503"
  		},		
   	  	{
   	  		id: "contact-country",
  			label: "Country:",
  			initialValue: "US",
  			currentValue: "US"
  		},		
   	  	{
   	  		id: "contact-phone",
  			label: "Phone:",
  			initialValue: "+1.7034444444",
  			currentValue: "+1.7034444444"
  		},		
   	  	{
   	  		id: "contact-pw",
  			label: "Password:",
  			initialValue: "2fooBAR",
  			currentValue: "2fooBAR"
  		}
  	];

 	$scope.eppTests = [
 		"contact check",
 		"contact create",
 		"contact delete",
 		"contact info",
    "contact transfer query",
    "contact update",
    "domain delete",
    "domain info",
    "domain info auth",
   "domain renew",
   "domain transfer",
   "domain transfer query",
   "domain update host attr",
   "domain update host attr"

  	];

  	$scope.updateSection = function (formId, scopeObject) {
  		var formInputs = $('#' + formId).find('input');
  		

  		for(var i = 0; i < formInputs.length; i++) {
			angular.forEach(scopeObject, function(value, key){
		   		if(value.id === formInputs[i].id) {
		   			value.currentValue = formInputs[i].value;
		   		}
		    });

		    updateInputStyle(formInputs[i])
  		}	
  	};

  	$scope.resetSection = function (formId, scopeObject) {
  		var formInputs = $('#' + formId).find('input');
  		
  		for(var i = 0; i < formInputs.length; i++) {
			angular.forEach(scopeObject, function(value, key){	   		
		   		if(value.id === formInputs[i].id) {
		   			formInputs[i].value = value.initialValue;
		   		}	   		
		    });
			updateInputStyle(formInputs[i])
		
  		}	
  	};

  	$scope.onChange = function () {
  		event.target.classList.remove("good");
  		event.target.classList.add("changed");
  	}

    $scope.showEPP = function (xmlToLoad) {

      var trigger = $("#codeContent");
      var itemContent = trigger.find(".js-pretty");

      var returned = returnEPPXML($scope.item.replace(/ /gi, "_"));

      if(returned.length >1 ) {
        var replaced = replaceTemplateItems(returned);
        itemContent.text(replaced);
      }
    }


  	function updateInputStyle(obj)  {
  		obj.classList.add("good");
  		obj.classList.remove("changed");
  	}

    function returnEPPXML (eppAction) {
        var xhttp = new XMLHttpRequest();
        xhttp.open("GET", "xml/" + eppAction + ".xml", false);
        xhttp.send();
        var xmlDoc = xhttp.responseXML;

        if(xmlDoc.length > 1) {
          return "";
        } else {
           return xmlDoc.firstElementChild.innerHTML;
        } 

      }

      function replaceTemplateItems (template) {
        var returnedFrag = template;

        angular.forEach($scope.domainDetails, function(value, key){        
          returnedFrag = returnedFrag.replace("{{" + value.id + "}}", value.currentValue )
        });

        angular.forEach($scope.contactDetails, function(value, key){        
          returnedFrag = returnedFrag.replace("{{" + value.id + "}}", value.currentValue )
        });

        return returnedFrag
      }


  })
