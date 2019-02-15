function newParty() {
  const x = document.getElementById('new_party');
  x.style.display = 'block';
}

function newOffice() {
  const x = document.getElementById('new_office');
  x.style.display = 'block';
}

function editParty() {
  const x = document.getElementById('edit_party');
  x.style.display = 'block';
}

function showMember() {
  const x = document.getElementById('members');
  if (x.style.display !== 'block') {
    x.style.display = 'block';
  } else {
    x.style.display = 'none';
  }
}

function deleteParty() {
  const x = document.getElementById('confirm');
  x.style.display = 'block';
}

function closeModal() {
  const x = document.getElementById('new_office');
  const y = document.getElementById('new_party');
  const z = document.getElementById('edit_party');
  const q = document.getElementById('confirm');
  x.style.display = 'none';
  y.style.display = 'none';
  z.style.display = 'none';
  q.style.display = 'none';
}


function resetPass() {
  const x = document.getElementById('pass');
  if (x.style.display !== 'block') {
    x.style.display = 'block';
  } else {
    x.style.display = 'none';
  }
}
