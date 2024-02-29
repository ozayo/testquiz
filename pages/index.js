import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import TopList from '../components/TopList'; // TopList bileşenini ekledik

export default function Home() {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [selectedGroup, setSelectedGroup] = useState('');

    useEffect(() => {
        // Sayfa yüklendiğinde önceki kullanıcı verilerini temizle
        localStorage.removeItem('username');
        localStorage.removeItem('selectedGroup');
    }, []);

    const handleStartQuiz = () => {
        if (username && selectedGroup) {
            localStorage.setItem('username', username);
            localStorage.setItem('selectedGroup', selectedGroup);
            router.push('/quiz');
        } else {
            alert('Lütfen kullanıcı adınızı ve soru grubunu seçin.');
        }
    };

    return (
        <div>
            <h1>Quiz Uygulaması</h1>
            <input
                type="text"
                placeholder="Kullanıcı Adı"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <select
                value={selectedGroup}
                onChange={(e) => setSelectedGroup(e.target.value)}
            >
                <option value="">Soru Grubu Seçin</option>
                <option value="group1">Soru Grubu 1</option>
                <option value="group2">Soru Grubu 2</option>
                {/* Diğer seçenekler buraya eklenebilir */}
            </select>
            <button onClick={handleStartQuiz}>Sınavı Başlat</button>
            <TopList /> {/* TopList bileşenini burada ekledik */}
        </div>
    );
}
