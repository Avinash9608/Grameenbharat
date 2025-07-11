
'use client';

import { useState, useEffect, useRef } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Sparkles, CalendarDays, Wind, Star, Users } from 'lucide-react'; 
import Header from '@/components/header';
import Footer from '@/components/footer';

type FestivalDetails = {
    description: string;
    significance: string | string[];
    celebration: string | { day: string; description: string }[] | { step: string; description: string }[];
    culturalElements?: string[];
};

interface Festival {
    name: string;
    image: string;
    hint: string;
    details: FestivalDetails;
}

const festivalData: { [state: string]: Festival[] } = {
    "Bihar": [
        {
            name: "Chhath Puja",
            image: "https://images.unsplash.com/photo-1731056994556-2f0660647908?w=600&auto=format&fit=crop",
            hint: "chhath puja",
            details: {
                description: "Chhath Puja is an ancient Hindu Vedic festival dedicated to Surya Dev (the Sun God) and Chhathi Maiya, considered the Goddess of purity, protection, and childbearing. It’s one of the most spiritually rigorous and environmentally conscious festivals in India, involving strict fasting, holy bathing, and ritual offerings. Chhath Puja is unique because it is one of the few Hindu festivals dedicated solely to the Sun God and celebrates nature, discipline, and gratitude.",
                significance: [
                    "Worshiping the Sun God, the ultimate source of energy, ensures health, prosperity, and progress.",
                    "Chhathi Maiya is believed to protect children and grant fertility, so women especially pray for the well-being of their offspring.",
                    "The festival reflects spiritual purity, environmental awareness, and community bonding."
                ],
                celebration: [
                    { day: "Day 1: Nahay Khay", description: "Devotees bathe in a holy river and prepare a pure vegetarian meal, usually lauki-bhaat (bottle gourd with rice). The house is thoroughly cleaned." },
                    { day: "Day 2: Kharna (Lohanda)", description: "A strict fast is observed all day without water. In the evening, a sweet dish called Rasaio-Kheer (jaggery rice pudding) is made and offered. After this, a 36-hour waterless fast begins." },
                    { day: "Day 3: Sandhya Arghya (Evening Offering)", description: "Devotees offer 'arghya' (water and fruits) to the setting sun at a riverbank or pond. Women wear traditional sarees and carry bamboo baskets filled with thekua, fruits, and sugarcane." },
                    { day: "Day 4: Usha Arghya (Morning Offering)", description: "The final day begins before sunrise. Devotees offer prayers to the rising sun, after which the fast is broken. Prasad is then distributed." }
                ],
                culturalElements: [
                    "Traditional songs (Chhath geet) are sung throughout the nights.",
                    "Rituals are done near natural water bodies—emphasizing the need for clean rivers and ponds.",
                    "Devotees stand in waist-deep water to perform the arghya.",
                    "Emphasis on minimalism, eco-friendliness, and community participation."
                ]
            }
        },
        {
            name: "Karam Festival",
            image: "https://utsav.gov.in/public/uploads/event_cover_image/event_683/166115539381102155.jpg",
            hint: "karam festival",
            details: {
                description: "Karam is a tribal harvest festival celebrated with immense devotion to nature and youth energy. The central ritual revolves around the Karam tree, whose branch is worshipped by unmarried girls and village youth as a symbol of prosperity and protection. The festival is deeply rooted in tribal identity, respect for nature, and belief in community harmony.",
                significance: [
                    "Karam Devta is worshipped for good harvest, social prosperity, fertility, and youth protection.",
                    "Girls pray for brothers’ long life, good fortune, and happy family life.",
                    "The Karam tree symbolizes strength, nature’s blessings, and ancestral connection."
                ],
                celebration: [
                    { step: "1. Planting Jawa (Germinated Seeds)", description: "For 7-9 days, girls sow barley, rice, or wheat seeds in small baskets with wet soil, keeping these germinated seedlings (Jawa) in dark rooms and watering daily." },
                    { step: "2. Collection of Karam Branch", description: "On the festival day, young men go to the forest in a procession with songs and drums to cut a Karam tree branch." },
                    { step: "3. Ritual Setup (Puja)", description: "The branch is planted in the village center, surrounded by the Jawa baskets. Offerings like earthen lamps, rice beer (handia), and sweets are made, while a village priest (Pahan) conducts rituals." },
                    { step: "4. Nightlong Celebration", description: "Youth gather to perform tribal folk dances like Jhumar and Paika around the Karam branch, accompanied by traditional instruments and storytelling." },
                    { step: "5. Immersion of Karam Branch", description: "The next morning, the branch and Jawa seedlings are immersed in a river or pond, symbolizing a return to nature." }
                ],
                culturalElements: [
                    "Eco-conscious: Uses natural, biodegradable materials.",
                    "Community bonding: Everyone participates—women, children, elders.",
                    "Songs: Special Karam Geet sung by women in local dialects.",
                    "Ritual purity: Girls stay vegetarian and avoid certain foods during the Karam week."
                ]
            }
        },
    ],
    "West Bengal": [
        {
            name: "Durga Puja",
            image: "https://images.unsplash.com/photo-1616074385287-67f6fb9e9eb8?w=600&auto=format&fit=crop",
            hint: "durga puja",
            details: {
                description: "Durga Puja is a major Hindu festival celebrating the victory of the goddess Durga over the demon Mahishasur. It is a grand celebration of art, culture, and devotion.",
                significance: "It symbolizes the victory of good over evil. The festival also marks the homecoming of Goddess Durga with her children.",
                celebration: "Elaborately decorated pandals (temporary structures) with idols of Durga are set up. The celebration includes prayers, feasts, cultural performances, and a grand immersion ceremony."
            }
        },
        {
            name: "Gajan",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Celebration_during_Gajan_1.jpg/500px-Celebration_during_Gajan_1.jpg",
            hint: "shiva devotee",
            details: {
                description: "Gajan is a folk festival dedicated to Lord Shiva, where devotees perform intense acts of penance and devotion.",
                significance: "It is a festival of sacrifice and austerity, undertaken to appease Lord Shiva and gain his blessings for a prosperous year.",
                celebration: "Devotees, known as 'sannyasis', engage in rituals like piercing their bodies, walking on fire, and performing acrobatic feats as a display of their faith."
            }
        },
    ],
    "Maharashtra": [
        {
            name: "Ganesh Chaturthi",
            image: "https://www.geedesk.com/blog/wp-content/uploads/2024/09/ganesh-chaturthi.jpg",
            hint: "ganesh chaturthi",
            details: {
                description: "Ganesh Chaturthi is a vibrant festival celebrating the birth of Lord Ganesha, the god of new beginnings and wisdom.",
                significance: "Devotees worship Ganesha to remove obstacles and bring good fortune. It is a time for community bonding and celebration.",
                celebration: "Clay idols of Ganesha are installed in homes and public pandals. The festival concludes with the immersion of the idols in water."
            }
        },
        {
            name: "Gudi Padwa",
            image: "https://i.pinimg.com/736x/0b/9f/38/0b9f38328e0a3609514b9e14fab5b165.jpg",
            hint: "gudi padwa",
            details: {
                description: "Gudi Padwa marks the traditional New Year for Marathi and Konkani Hindus. It is celebrated on the first day of the Chaitra month.",
                significance: "It symbolizes new beginnings, victory, and prosperity. The 'Gudi' (a decorated pole with a cloth and neem leaves) is hoisted to ward off evil.",
                celebration: "People clean their houses, wear new clothes, and prepare festive dishes. The day is filled with processions, music, and dance."
            }
        },
    ],
    "Rajasthan": [
        {
            name: "Pushkar Camel Fair",
            image: "https://plus.unsplash.com/premium_photo-1697729460658-6a831a518d2a?w=600&auto=format&fit=crop",
            hint: "pushkar fair",
            details: {
                description: "The Pushkar Camel Fair is one of the world's largest cattle fairs, featuring thousands of camels, horses, and cattle. It is a vibrant spectacle of Rajasthani culture.",
                significance: "Primarily a livestock fair, it has also become a major tourist attraction, combining commerce with cultural and religious activities around the Pushkar Lake.",
                celebration: "The fair includes camel races, cultural performances, folk music, and various competitions. It coincides with the holy Kartik Purnima festival."
            }
        },
        {
            name: "Teej",
            image: "https://th-i.thgim.com/public/news/cities/Hyderabad/article19439788.ece/alternates/FREE_1200/HY06TEEJ",
            hint: "teej festival",
            details: {
                description: "Teej is a monsoon festival celebrated by women, marking the union of Goddess Parvati with Lord Shiva.",
                significance: "Married women pray for the well-being of their husbands and a happy marital life. Unmarried women pray for a good husband.",
                celebration: "Women dress in traditional attire, apply henna, and enjoy swinging on beautifully decorated swings. Fasting and feasting are integral parts of the celebration."
            }
        }
    ],
    "Punjab": [
        {
            name: "Baisakhi",
            image: "https://imgk.timesnownews.com/story/1555092708-baisakhi_final.jpg?tr=w-1200,h-900",
            hint: "baisakhi festival",
            details: {
                description: "Baisakhi is the Sikh New Year and a spring harvest festival. It holds immense religious significance for Sikhs as the day the Khalsa was founded.",
                significance: "It marks the beginning of the harvest season and is a time of thanksgiving. For Sikhs, it commemorates the formation of the Khalsa Panth by Guru Gobind Singh in 1699.",
                celebration: "People visit Gurdwaras, participate in processions (Nagar Kirtan), and enjoy traditional folk dances like Bhangra and Gidda."
            }
        },
        {
            name: "Lohri",
            image: "https://img.jagranjosh.com/images/2025/January/1212025/images-lohri.jpg",
            hint: "lohri festival",
            details: {
                description: "Lohri is a popular winter folk festival, celebrated primarily by Sikhs and Hindus from the Punjab region. It marks the end of winter and the passing of the winter solstice.",
                significance: "It is a festival of harvest and fertility, celebrating the sun's journey to the northern hemisphere. It is especially significant for newborns and newly-weds.",
                celebration: "Celebrations involve lighting a bonfire, around which people sing and dance, offering peanuts, popcorn, and other sweets to the fire."
            }
        }
    ],
    "Kerala": [
        {
            name: "Onam",
            image: "https://static.india.com/wp-content/uploads/2021/08/pjimage-64-1.jpg?impolicy=Medium_Resize&w=1200&h=800",
            hint: "onam festival",
            details: {
                description: "Onam is the official state festival of Kerala. It is a harvest festival celebrating the mythical homecoming of King Mahabali.",
                significance: "It symbolizes prosperity, happiness, and the spirit of unity. People believe King Mahabali visits his people during Onam.",
                celebration: "The ten-day festival includes creating intricate flower carpets (Pookalam), the grand feast (Onam Sadya), snake boat races (Vallam Kali), and traditional dances like Kathakali and Pulikali (tiger dance)."
            }
        },
        {
            name: "Vallam Kali",
            image: "https://img.etimg.com/thumb/width-600,height-450,msid-85623372,imgsize-77152/watch-vallam-kali-keralas-traditional-boat-race-held-symbolically-with-just-three-snake-boats-due-to-the-covid-19-situation-in-the-state.jpg",
            hint: "snake boat race",
            details: {
                description: "Vallam Kali, the traditional snake boat race of Kerala, is a thrilling event held on the backwaters during the harvest season.",
                significance: "It is a celebration of teamwork, community spirit, and the rich maritime heritage of Kerala. Each boat represents a village, and the race is a matter of immense pride.",
                celebration: "Long canoes, resembling snakes, and rowed by dozens of men, compete fiercely to the rhythm of traditional boat songs (vanchipattu)."
            }
        },
        {
            name: "Garudan Thookam",
            image: "https://compass.rauias.com/wp-content/uploads/2024/04/image-25-1024x486.png",
            hint: "temple ritual",
            details: {
                description: "Garudan Thookam is a dramatic ritual art form performed in certain Kali temples in Kerala as an offering to the goddess.",
                significance: "The ritual reenacts the story of Garuda, the eagle-vehicle of Lord Vishnu, offering his blood to appease the goddess Kali.",
                celebration: "Devotees dressed as Garuda are suspended from a tall structure by hooks pierced into their backs and are paraded around the temple."
            }
        },
    ],
    "Tamil Nadu": [
        {
            name: "Thaipusam",
            image: "https://upload.wikimedia.org/wikipedia/commons/f/f7/Penang_thaipusam_Kavadi_procceession.jpg",
            hint: "thaipusam festival",
            details: {
                description: "Thaipusam is a dramatic festival of faith and penance dedicated to the Hindu god Lord Murugan.",
                significance: "Devotees make vows and offer thanks to Lord Murugan for prayers answered. The festival celebrates the victory of good over evil.",
                celebration: "The main feature is the act of penance where devotees carry 'kavadis' (burdens) and pierce their bodies with skewers and hooks, entering a trance-like state of devotion."
            }
        },
        {
            name: "Jallikattu",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuftRuGaH_Z6B-ml4dQeEx8ggQkYUCWjnZtA&s",
            hint: "bull taming",
            details: {
                description: "Jallikattu is a traditional bull-taming sport held during the Pongal harvest festival in Tamil Nadu.",
                significance: "It is considered a display of bravery and a way to honor the bulls, which are vital for farming. It is a deeply rooted cultural tradition.",
                celebration: "Participants attempt to embrace the hump of a running bull and hold on for as long as possible. The event is a test of courage and skill."
            }
        },
    ],
    "Uttarakhand": [
        {
            name: "Ghughutiya",
            image: "https://devbhoomidarshan.in/wp-content/uploads/2024/12/ghughutiya-festival-photo.webp",
            hint: "indian festival",
            details: {
                description: "Ghughutiya, also known as Kale Kauva, is celebrated on Makar Sankranti. It is a festival that celebrates the bond between humans and nature.",
                significance: "It symbolizes gratitude towards crows and migratory birds who endure the harsh winters. It is a prayer for their safe return.",
                celebration: "People prepare sweet wheat-flour delicacies called 'ghughuts' shaped like birds and offer them to the crows."
            }
        },
        {
            name: "Bagwal Mela",
            image: "https://utsav.gov.in/public/uploads/event_cover_image/event_389/1655984018873520209.jpeg",
            hint: "stone festival",
            details: {
                description: "Bagwal Mela is a unique and ancient festival where two groups of villagers throw stones at each other as a ritual offering.",
                significance: "It is a blood-offering to the goddess Barahi Devi. The ritual is believed to bring prosperity and protect the village from disasters.",
                celebration: "Held under strict supervision, the stone-pelting lasts for a few minutes until the temple priest signals the end. It is followed by a community fair."
            }
        },
    ],
    "Odisha": [
        {
            name: "Boita Bandana",
            image: "https://www.orissapost.com/wp-content/uploads/2019/11/Boita-Bandana-Utsav-celebrated-in-Sundargarh.jpg",
            hint: "boat festival",
            details: {
                description: "Boita Bandana commemorates the rich maritime history of Odisha, celebrating the ancient sea voyages of its merchants (sadhabas).",
                significance: "It is a tribute to the sailors and merchants who traveled to distant lands like Bali, Java, and Sumatra for trade.",
                celebration: "On Kartik Purnima, people float miniature boats made of banana stems or paper with lamps and offerings in rivers and ponds."
            }
        },
        {
            name: "Samba Dashami",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXGhYCfZSiPGhv30FCPZNFQazx9gaspX5gbw&s",
            hint: "sun god",
            details: {
                description: "Samba Dashami is a festival unique to Odisha, where mothers worship the Sun God for the health and well-being of their children.",
                significance: "The festival is based on the legend of Samba, Lord Krishna's son, who was cured of leprosy by praying to the Sun God.",
                celebration: "Mothers prepare special dishes and offer them to the Sun God at different times of the day, praying for their children's longevity."
            }
        },
        {
            name: "Dola Jatra",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuclxgQ8FReYAtKycmb1_CNqXIIYzDUGcRWQ&s",
            hint: "swinging deities",
            details: {
                description: "Dola Jatra, also known as Dola Purnima, is a major festival in Odisha that is similar to Holi. It celebrates the divine love of Radha and Krishna.",
                significance: "It marks the beginning of spring and is a celebration of love, color, and community.",
                celebration: "Idols of Radha and Krishna are placed on decorated swings (dola) and are carried in processions. People play with colors (abira) and enjoy festive foods."
            }
        },
    ],
    "Assam": [
        {
            name: "Bohag Bihu",
            image: "https://images.unsplash.com/photo-1629649213060-4874f8f6bce3?w=600&auto=format&fit=crop",
            hint: "bihu dance",
            details: {
                description: "Bohag Bihu, also known as Rongali Bihu, is the most important festival in Assam, celebrating the Assamese New Year and the onset of spring.",
                significance: "It is a festival of joy, fertility, and new beginnings, marking the start of the agricultural season.",
                celebration: "The festival lasts for several days and is marked by Bihu dance, folk songs, feasting, and exchanging traditional sweets."
            }
        },
        {
            name: "Kherai Puja",
            image: "https://cf-img-a-in.tosshub.com/lingo/itne/images/story/202206/iuewuisw.jpg?size=948:533",
            hint: "bodo tribe",
            details: {
                description: "Kherai Puja is the most important religious festival of the Bodo community. It is a vibrant ritual worshiping Bathou Bwrai, their supreme deity.",
                significance: "It is performed for the well-being of the community, for a good harvest, and to protect against evil spirits.",
                celebration: "The puja involves a trance-like dance by a priestess (Doudini) around a sacred Sijou plant, accompanied by traditional music and offerings."
            }
        },
        {
            name: "Rongker",
            image: "https://utsav.gov.in/public/uploads/event_picture_image/event_547/16577243721659203687.jpg",
            hint: "karbi tribe",
            details: {
                description: "Rongker is an annual festival of the Karbi tribe, celebrated to appease the local deities and seek their blessings for the village's welfare.",
                significance: "It is a community festival aimed at protecting the village from diseases, natural calamities, and ensuring a good harvest.",
                celebration: "The festival involves animal sacrifices and various rituals performed by the village priest. It is a time of communal solidarity and feasting."
            }
        },
    ],
    "Manipur": [
        {
            name: "Yaosang",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBKxaWzJli-ZQUo2kw12V_dYA4sHm8W4Swgg&s",
            hint: "manipur festival",
            details: {
                description: "Yaosang is Manipur's version of Holi, but it is a much more elaborate festival celebrated for five days during spring.",
                significance: "It is a festival of joy, rejuvenation, and community bonding, blending indigenous traditions with the spirit of Holi.",
                celebration: "Celebrations include burning a ceremonial hut (Yaosang Mei Thaba), playing with colors, traditional Thabal Chongba folk dance, and sporting events."
            }
        },
    ],
    "Meghalaya": [
        {
            name: "Wangala",
            image: "https://i0.wp.com/www.tusktravel.com/blog/wp-content/uploads/2023/11/100-Drums-Festival-of-Meghalay.jpg?fit=1365%2C1024&ssl=1",
            hint: "hundred drums",
            details: {
                description: "Wangala, also known as the Festival of a Hundred Drums, is a post-harvest festival of the Garo tribe, thanking the Sun God (Misi Saljong) for a bountiful harvest.",
                significance: "It marks the end of the agricultural year and is a time of thanksgiving and rejoicing.",
                celebration: "The highlight of the festival is the energetic dance performed by men and women in traditional attire to the rhythmic beat of long, oval-shaped drums (dama)."
            }
        },
    ],
    "Nagaland": [
        {
            name: "Tuluni",
            image: "https://utsav.gov.in/public/uploads/event_picture_image/event_46/16559633591397386022.jpg",
            hint: "naga tribe",
            details: {
                description: "Tuluni is the most significant festival of the Sumi Naga tribe, celebrated to mark the end of the dry season and the beginning of new fruits.",
                significance: "It is a festival of feasting, celebration, and thanksgiving for a bountiful harvest. It also plays a role in matchmaking and strengthening community ties.",
                celebration: "The festival involves grand feasts, exchange of gifts, rice beer, and traditional songs and dances. It is a time of great merriment."
            }
        },
    ],
    "Andhra Pradesh": [
        {
            name: "Bani Festival",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTG6nBFRMKd8TXVV2BcC5U1RgyxGLS357JyDw&s",
            hint: "stick fighting",
            details: {
                description: "The Bani Festival is a unique and intense ritual held annually during Dussehra at the Devaragattu Temple in Kurnool district.",
                significance: "The festival commemorates the victory of the deity Mala Malleswara Swamy over a demon. The mock fight is a reenactment of this battle.",
                celebration: "Thousands of devotees from surrounding villages engage in a massive mock stick-fight (lathi-khela) at midnight, often resulting in injuries, which are considered a sign of divine blessing."
            }
        },
        {
            name: "Bonalu",
            image: "https://www.abhibus.com/blog/wp-content/uploads/2023/06/Hyderabad-Bonalu-2023.jpg",
            hint: "bonalu festival",
            details: {
                description: "Bonalu is a vibrant Hindu festival celebrated in Telangana and parts of Andhra Pradesh, dedicated to the Goddess Mahakali.",
                significance: "It is a thanksgiving festival to the Goddess for fulfilling vows and protecting the people from diseases.",
                celebration: "Women carry decorated pots filled with cooked rice, jaggery, and milk (Bonam) on their heads to offer to the Goddess. The festival is marked by feasts, processions, and trance-like dances (Pothuraju)."
            }
        },
    ],
    "Karnataka": [
        {
            name: "Made Snana",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnQ_jcq1FDS12MHvb-K9-pL2xhf5WI2Zfx3A&s",
            hint: "temple ritual",
            details: {
                description: "Made Snana is a controversial religious ritual where devotees from lower castes roll over the leftover food on banana leaves eaten by Brahmins.",
                significance: "Devotees believe that performing this ritual can cure skin diseases and fulfill their wishes. It is considered an act of ultimate faith and submission.",
                celebration: "The ritual is performed at certain temples, most notably the Kukke Subramanya Temple, despite legal challenges and protests."
            }
        },
    ],
    "Gujarat": [
        {
            name: "Uttarayan",
            image: "https://www.oyorooms.com/travel-guide/wp-content/uploads/2020/01/Generic-1-23.jpg",
            hint: "kite festival",
            details: {
                description: "Uttarayan, the International Kite Festival, is one of the most vibrant festivals in Gujarat, celebrated on Makar Sankranti.",
                significance: "It marks the day when winter begins to turn into summer, according to the Indian calendar. It is a day of joy, celebration, and friendly competition.",
                celebration: "Skies across Gujarat are filled with kites of all shapes and sizes. People engage in kite fights, and the festival is accompanied by delicious traditional food like undhiyu, jalebi, and chikki."
            }
        },
    ],
    "Jammu and Kashmir": [
        {
            name: "Wanvun",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKW10obA_pjazW73F1HqvLQig2tWkfVABSDQ&s",
            hint: "kashmiri wedding",
            details: {
                description: "Wanvun is not a festival but a traditional form of Kashmiri folk music sung during weddings and other celebrations.",
                significance: "It is an integral part of Kashmiri culture, setting a celebratory and emotional tone for the wedding ceremonies.",
                celebration: "Women from the bride's and groom's families gather in separate groups and sing soulful verses, often in a call-and-response format, throughout the wedding festivities."
            }
        }
    ]
};

interface SelectedFestival extends Festival {
    state: string;
}

const FestivalsPage = () => {
    const [selectedFestival, setSelectedFestival] = useState<SelectedFestival | null>(null);
    const [scrollY, setScrollY] = useState(0);
    const heroRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const parallaxStyle = {
        transform: `translate3d(0, ${scrollY * 0.4}px, 0)`,
    };


    const handleFestivalClick = (festival: Festival, stateName: string) => {
        if (selectedFestival?.name === festival.name && selectedFestival?.state === stateName) {
            setSelectedFestival(null);
            return;
        }
        setSelectedFestival({ ...festival, state: stateName });
    };

    const renderCelebration = (celebration: any) => {
        if (Array.isArray(celebration)) {
            return (
                <div className="space-y-4 mt-4">
                    {celebration.map((item, index) => (
                        <div key={index} className="pl-4 border-l-4 border-primary/50">
                            <p className="font-bold text-lg">{item.day || item.step}</p>
                            <p>{item.description}</p>
                        </div>
                    ))}
                </div>
            );
        }
        return <p className="text-muted-foreground">{celebration}</p>;
    };
    
    return (
        <div className="flex flex-col min-h-screen bg-background">
            <Header />
            
            <section ref={heroRef} className="relative h-[60vh] w-full flex items-center justify-center text-center overflow-hidden">
                <div className="absolute inset-0 z-[-1] overflow-hidden">
                    <div style={parallaxStyle} className="absolute inset-[-10%] w-[120%] h-[120%]">
                        <Image
                            src="https://images.unsplash.com/photo-1741877520432-6dafacb83656?w=1920&h=1080&auto=format&fit=crop"
                            alt="Indian festival celebration"
                            fill
                            className="object-cover"
                            priority
                            data-ai-hint="indian festival"
                        />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20" />
                </div>
                <div className="relative z-10 flex flex-col items-center gap-6 p-4">
                    <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white drop-shadow-lg">
                        Festivals of India
                    </h1>
                    <p className="max-w-3xl text-lg md:text-xl lg:text-2xl text-stone-100 drop-shadow-md">
                        Explore the vibrant tapestry of rituals and celebrations from across the states of India.
                    </p>
                </div>
            </section>

            <main className="flex-1 py-16 md:py-24">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                        <div className="md:col-span-5 lg:col-span-4">
                            <div className="sticky top-24">
                                <h2 className="font-headline text-3xl font-bold mb-6">Festivals by State</h2>
                                <Accordion type="single" collapsible className="w-full bg-card p-4 rounded-lg shadow-md">
                                    {Object.entries(festivalData).map(([state, festivals]) => (
                                        <AccordionItem key={state} value={state}>
                                            <AccordionTrigger className="text-xl font-semibold hover:no-underline">{state}</AccordionTrigger>
                                            <AccordionContent>
                                                <div className="flex flex-col gap-2 pt-2">
                                                    {festivals.map(festival => (
                                                        <Button
                                                            key={festival.name}
                                                            variant={selectedFestival?.name === festival.name ? 'secondary' : 'ghost'}
                                                            className="justify-start h-auto py-2 text-left"
                                                            onClick={() => handleFestivalClick(festival, state)}
                                                        >
                                                            {festival.name}
                                                        </Button>
                                                    ))}
                                                </div>
                                            </AccordionContent>
                                        </AccordionItem>
                                    ))}
                                </Accordion>
                            </div>
                        </div>

                        <div className="md:col-span-7 lg:col-span-8">
                           <Card className="sticky top-24 shadow-xl overflow-hidden">
                               <CardHeader className="bg-secondary/20 p-6">
                                   <CardTitle className="font-headline text-4xl">
                                      {selectedFestival ? selectedFestival.name : "Select a Festival"}
                                   </CardTitle>
                                   <CardDescription className="text-base pt-1">
                                        {selectedFestival ? `A prominent festival from ${selectedFestival.state}` : "Click on a festival from the list to learn more."}
                                   </CardDescription>
                               </CardHeader>
                               <CardContent className="p-6">
                                   {selectedFestival ? (
                                       <div className="space-y-8">
                                            <div className="relative h-64 md:h-80 w-full rounded-lg overflow-hidden shadow-inner">
                                                <Image src={selectedFestival.image} alt={selectedFestival.name} fill className="object-cover" data-ai-hint={selectedFestival.hint} />
                                            </div>
                                           <div className="space-y-6">
                                                <div>
                                                    <h3 className="font-headline text-2xl font-semibold flex items-center gap-3 mb-3 text-primary border-b pb-2">
                                                        <Sparkles/> Description
                                                    </h3>
                                                    <p className="text-muted-foreground">{selectedFestival.details.description}</p>
                                                </div>

                                                <div>
                                                    <h3 className="font-headline text-2xl font-semibold flex items-center gap-3 mb-3 text-primary border-b pb-2">
                                                        <Star/> Significance
                                                    </h3>
                                                    {Array.isArray(selectedFestival.details.significance) ? (
                                                        <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                                                            {selectedFestival.details.significance.map((item, index) => <li key={index}>{item}</li>)}
                                                        </ul>
                                                    ) : (
                                                        <p className="text-muted-foreground">{selectedFestival.details.significance}</p>
                                                    )}
                                                </div>

                                                <div>
                                                    <h3 className="font-headline text-2xl font-semibold flex items-center gap-3 mb-3 text-primary border-b pb-2">
                                                        <CalendarDays/> How It's Celebrated
                                                    </h3>
                                                    {renderCelebration(selectedFestival.details.celebration)}
                                                </div>

                                                {selectedFestival.details.culturalElements && (
                                                     <div>
                                                        <h3 className="font-headline text-2xl font-semibold flex items-center gap-3 mb-3 text-primary border-b pb-2">
                                                            <Wind/> Cultural Elements
                                                        </h3>
                                                        <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                                                            {selectedFestival.details.culturalElements.map((item, index) => <li key={index}>{item}</li>)}
                                                        </ul>
                                                    </div>
                                                )}
                                           </div>
                                       </div>
                                   ) : (
                                       <div className="flex flex-col items-center justify-center text-center p-8 rounded-lg bg-secondary/30 h-[50vh]">
                                            <Image src="https://images.unsplash.com/photo-1629649213060-4874f8f6bce3?w=600&auto=format&fit=crop" data-ai-hint="indian culture festival" width={200} height={200} alt="A collage of Indian culture" className="rounded-full mb-4 opacity-70 size-40 object-cover shadow-lg"/>
                                            <p className="text-muted-foreground font-semibold max-w-xs mt-4">The stories and traditions of India's festivals are waiting to be explored.</p>
                                       </div>
                                   )}
                               </CardContent>
                           </Card>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default FestivalsPage;

    