const friends = [
    { name: 'Luis', avatar: 'https://i.pravatar.cc/150?u=5', invited: false },
    { name: 'Elena', avatar: 'https://i.pravatar.cc/150?u=6', invited: false },
    { name: 'Sofia', avatar: 'https://i.pravatar.cc/150?u=7', invited: false },
    { name: 'Carlos', avatar: 'https://i.pravatar.cc/150?u=8', invited: false }
];

const friendsMenu = document.getElementById('friendsMenu');
const friendsList = document.getElementById('friendsList');
const addParticipantBtn = document.getElementById('addParticipantBtn');
const inviteAlert = document.getElementById('inviteAlert');
const invitationSentAlert = document.getElementById('invitationSentAlert');
const videoParticipants = document.getElementById('videoParticipants');

addParticipantBtn.addEventListener('click', () => {
    friendsMenu.classList.remove('hidden');
    friendsList.innerHTML = friends.map(friend => `
        <div class="flex justify-between items-center bg-gray-700 p-2 rounded-lg">
            <div class="flex items-center space-x-3">
                <img src="${friend.avatar}" alt="${friend.name}" class="w-10 h-10 rounded-full">
                <span class="text-white">${friend.name}</span>
            </div>
            <button id="inviteBtn-${friend.name}" class="bg-green-500 text-white px-3 py-1 rounded-full ${friend.invited ? 'disabled' : ''}" 
                onclick="sendInvitation('${friend.name}', '${friend.avatar}')">
                ${friend.invited ? 'Ya en la llamada' : 'Invitar'}
            </button>
        </div>
    `).join('');
});

document.getElementById('closeFriendsMenu').addEventListener('click', () => {
    friendsMenu.classList.add('hidden');
});

function sendInvitation(name, avatar) {
    const friend = friends.find(f => f.name === name);
    if (friend.invited) {
        return;
    }

    const inviteBtn = document.getElementById(`inviteBtn-${name}`);
    inviteBtn.disabled = true;
    inviteBtn.textContent = 'Invitación Enviada';

    inviteAlert.classList.remove('hidden');
    
    setTimeout(() => {
        inviteAlert.classList.add('hidden');
        invitationSentAlert.classList.remove('hidden');
        
        friend.invited = true;

        setTimeout(() => {
            invitationSentAlert.classList.add('hidden');
            
            const participantDiv = document.createElement('div');
            participantDiv.classList.add('bg-gray-800', 'rounded-xl', 'aspect-square', 'relative', 'overflow-hidden', 'group');
            participantDiv.innerHTML = `
                <img src="${avatar}" class="w-full h-full object-cover group-hover:scale-110 transition">
                <div class="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-center p-1">
                    ${name}
                </div>
            `;
            videoParticipants.appendChild(participantDiv);
            
            inviteBtn.textContent = 'Ya en la llamada';
            inviteBtn.classList.add('bg-gray-600');
        }, 1000);
    }, 1000);
}
