
document.getElementById('save').addEventListener('click', function(evt) {
    evt.preventDefault();

    const doc = document.implementation.createDocument(null, 'ЗАПРОС_СВЕДЕНИЙ_О_СТРАХОВОМ_СТАЖЕ');
    const generalDuration = document.createElementNS(null, editString(document.getElementById('experience_duration').getElementsByTagName('h2')[0].innerText));

    const labels = document.getElementsByTagName('label');

    let element;
    let input;
    for(let i = 0; i < labels.length; i++){
      element = document.createElementNS(null, editString(labels[i].innerText));
      input = document.getElementById(labels[i].getAttribute('for'));

      //validation
      if(input.validity.valid){
        element.textContent = input.value;
      }else{
        return false;
      }

      //adding tags and it's content to XML
      if(i < 6){
        doc.documentElement.appendChild(element);
      }else{
        generalDuration.appendChild(element);
      }

      if(i == labels.length - 1){
        doc.documentElement.appendChild(generalDuration);
      }
    };

    form.reset();
    getRequest(doc);

});

const editString = string => {return string.split(' ').map(word => word = word.charAt(0).toUpperCase() + word.slice(1, word.length)).join('')}

const getRequest = request => {
  document.getElementById('container_request').style.display = 'block';
  document.getElementById('final_request').innerText = formatXml(new XMLSerializer().serializeToString(request));
}

const formatXml = xml => {
  return xml.replaceAll(/<(.*?)>(.*)<\/(\1)>/g, (...matches) =>{
      if(`${matches[2]}`.match(/<(.*?)>(.*)<\/(\1)>/)){
        return `<${matches[1]}>\n` + formatXml(`${matches[2]}`) + `\n</${matches[1]}>`
      }else{
        return `<${matches[1]}>` + `${matches[2]}` + `</${matches[1]}>\n`;
      }
  }).replaceAll(/(\n)+/g,'\n');
}
