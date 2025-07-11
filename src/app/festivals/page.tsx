
'use client';

import { useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Sparkles, CalendarDays, Wind, Star, Users } from 'lucide-react'; // Assuming Users is a good icon for community
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
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRo64UuS3E89Ejw9kuY1EuU1M1Y5S2C_dCtHw&usqp=CAU",
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
            image: "https://placehold.co/600x400.png",
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
            image: "https://images.unsplash.com/photo-1596423924829-544a83c5c9e2?w=600&auto=format&fit=crop",
            hint: "ganesh chaturthi",
            details: {
                description: "Ganesh Chaturthi is a vibrant festival celebrating the birth of Lord Ganesha, the god of new beginnings and wisdom.",
                significance: "Devotees worship Ganesha to remove obstacles and bring good fortune. It is a time for community bonding and celebration.",
                celebration: "Clay idols of Ganesha are installed in homes and public pandals. The festival concludes with the immersion of the idols in water."
            }
        },
        {
            name: "Gudi Padwa",
            image: "https://placehold.co/600x400.png",
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
            image: "https://placehold.co/600x400.png",
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
            image: "https://media.istockphoto.com/id/1500853989/photo/happy-senior-punjabi-sikh-couple-wearing-colorful-cloths-standing-together-at-agriculture.webp?a=1&b=1&s=612x612",
            hint: "baisakhi festival",
            details: {
                description: "Baisakhi is the Sikh New Year and a spring harvest festival. It holds immense religious significance for Sikhs as the day the Khalsa was founded.",
                significance: "It marks the beginning of the harvest season and is a time of thanksgiving. For Sikhs, it commemorates the formation of the Khalsa Panth by Guru Gobind Singh in 1699.",
                celebration: "People visit Gurdwaras, participate in processions (Nagar Kirtan), and enjoy traditional folk dances like Bhangra and Gidda."
            }
        },
        {
            name: "Lohri",
            image: "https://placehold.co/600x400.png",
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
            image: "https://images.unsplash.com/photo-1632839088691-3bc8c9629e46?w=600&auto=format&fit=crop",
            hint: "onam festival",
            details: {
                description: "Onam is the official state festival of Kerala. It is a harvest festival celebrating the mythical homecoming of King Mahabali.",
                significance: "It symbolizes prosperity, happiness, and the spirit of unity. People believe King Mahabali visits his people during Onam.",
                celebration: "The ten-day festival includes creating intricate flower carpets (Pookalam), the grand feast (Onam Sadya), snake boat races (Vallam Kali), and traditional dances like Kathakali and Pulikali (tiger dance)."
            }
        },
        {
            name: "Vallam Kali",
            image: "https://placehold.co/600x400.png",
            hint: "snake boat race",
            details: {
                description: "Vallam Kali, the traditional snake boat race of Kerala, is a thrilling event held on the backwaters during the harvest season.",
                significance: "It is a celebration of teamwork, community spirit, and the rich maritime heritage of Kerala. Each boat represents a village, and the race is a matter of immense pride.",
                celebration: "Long canoes, resembling snakes and rowed by dozens of men, compete fiercely to the rhythm of traditional boat songs (vanchipattu)."
            }
        },
        {
            name: "Garudan Thookam",
            image: "https://placehold.co/600x400.png",
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
            image: "https://placehold.co/600x400.png",
            hint: "thaipusam festival",
            details: {
                description: "Thaipusam is a dramatic festival of faith and penance dedicated to the Hindu god Lord Murugan.",
                significance: "Devotees make vows and offer thanks to Lord Murugan for prayers answered. The festival celebrates the victory of good over evil.",
                celebration: "The main feature is the act of penance where devotees carry 'kavadis' (burdens) and pierce their bodies with skewers and hooks, entering a trance-like state of devotion."
            }
        },
        {
            name: "Jallikattu",
            image: "https://placehold.co/600x400.png",
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
            image: "https://placehold.co/600x400.png",
            hint: "indian festival",
            details: {
                description: "Ghughutiya, also known as Kale Kauva, is celebrated on Makar Sankranti. It is a festival that celebrates the bond between humans and nature.",
                significance: "It symbolizes gratitude towards crows and migratory birds who endure the harsh winters. It is a prayer for their safe return.",
                celebration: "People prepare sweet wheat-flour delicacies called 'ghughuts' shaped like birds and offer them to the crows."
            }
        },
        {
            name: "Bagwal Mela",
            image: "https://placehold.co/600x400.png",
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
            image: "https://placehold.co/600x400.png",
            hint: "boat festival",
            details: {
                description: "Boita Bandana commemorates the rich maritime history of Odisha, celebrating the ancient sea voyages of its merchants (sadhabas).",
                significance: "It is a tribute to the sailors and merchants who traveled to distant lands like Bali, Java, and Sumatra for trade.",
                celebration: "On Kartik Purnima, people float miniature boats made of banana stems or paper with lamps and offerings in rivers and ponds."
            }
        },
        {
            name: "Samba Dashami",
            image: "https://placehold.co/600x400.png",
            hint: "sun god",
            details: {
                description: "Samba Dashami is a festival unique to Odisha, where mothers worship the Sun God for the health and well-being of their children.",
                significance: "The festival is based on the legend of Samba, Lord Krishna's son, who was cured of leprosy by praying to the Sun God.",
                celebration: "Mothers prepare special dishes and offer them to the Sun God at different times of the day, praying for their children's longevity."
            }
        },
        {
            name: "Dola Jatra",
            image: "https://placehold.co/600x400.png",
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
            image: "https://placehold.co/600x400.png",
            hint: "bodo tribe",
            details: {
                description: "Kherai Puja is the most important religious festival of the Bodo community. It is a vibrant ritual worshiping Bathou Bwrai, their supreme deity.",
                significance: "It is performed for the well-being of the community, for a good harvest, and to protect against evil spirits.",
                celebration: "The puja involves a trance-like dance by a priestess (Doudini) around a sacred Sijou plant, accompanied by traditional music and offerings."
            }
        },
        {
            name: "Rongker",
            image: "https://placehold.co/600x400.png",
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
            image: "https://placehold.co/600x400.png",
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
            image: "https://placehold.co/600x400.png",
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
            image: "https://placehold.co/600x400.png",
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
            image: "https://placehold.co/600x400.png",
            hint: "stick fighting",
            details: {
                description: "The Bani Festival is a unique and intense ritual held annually during Dussehra at the Devaragattu Temple in Kurnool district.",
                significance: "The festival commemorates the victory of the deity Mala Malleswara Swamy over a demon. The mock fight is a reenactment of this battle.",
                celebration: "Thousands of devotees from surrounding villages engage in a massive mock stick-fight (lathi-khela) at midnight, often resulting in injuries, which are considered a sign of divine blessing."
            }
        },
        {
            name: "Bonalu",
            image: "https://placehold.co/600x400.png",
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
            image: "https://placehold.co/600x400.png",
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
            image: "https://images.unsplash.com/photo-1550697943-463e26458155?w=600&auto=format&fit=crop",
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
            image: "https://placehold.co/600x400.png",
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
        return <p>{celebration}</p>;
    };
    
    return (
        <div className="flex flex-col min-h-screen bg-background">
            <Header />
            <main className="flex-1 py-24 pt-32 md:py-32">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="text-center mb-16">
                        <h1 className="font-headline text-5xl md:text-7xl font-bold">Festivals of India</h1>
                        <p className="text-lg text-muted-foreground mt-4 max-w-3xl mx-auto">
                            Explore the vibrant tapestry of rituals and celebrations from across the states of India.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                        <div className="md:col-span-5 lg:col-span-4">
                            <h2 className="font-headline text-3xl font-bold mb-6">Festivals by State</h2>
                             <Accordion type="single" collapsible className="w-full">
                                {Object.entries(festivalData).map(([state, festivals]) => (
                                    <AccordionItem key={state} value={state}>
                                        <AccordionTrigger className="text-xl font-semibold">{state}</AccordionTrigger>
                                        <AccordionContent>
                                            <div className="flex flex-col gap-4 pl-2">
                                                {festivals.map(festival => (
                                                    <Button
                                                        key={festival.name}
                                                        variant={selectedFestival?.name === festival.name ? 'secondary' : 'ghost'}
                                                        className="justify-start"
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

                        <div className="md:col-span-7 lg:col-span-8">
                           <Card className="sticky top-24 shadow-xl">
                               <CardHeader>
                                   <CardTitle className="font-headline text-4xl">
                                      {selectedFestival ? selectedFestival.name : "Select a Festival"}
                                   </CardTitle>
                                   <CardDescription>
                                        {selectedFestival ? `A prominent festival from ${selectedFestival.state}` : "Click on a festival from the list to learn more about it."}
                                   </CardDescription>
                               </CardHeader>
                               <CardContent>
                                   {selectedFestival ? (
                                       <div className="space-y-8">
                                            <div className="relative h-64 md:h-80 w-full rounded-lg overflow-hidden shadow-inner">
                                                <Image src={selectedFestival.image} alt={selectedFestival.name} fill className="object-cover" data-ai-hint={selectedFestival.hint} />
                                            </div>
                                           <div className="prose prose-lg max-w-none text-foreground">
                                                <div>
                                                    <h3 className="font-headline text-2xl font-semibold flex items-center gap-2"><Sparkles className="text-primary"/> Description</h3>
                                                    <p>{selectedFestival.details.description}</p>
                                                </div>

                                                <div>
                                                    <h3 className="font-headline text-2xl font-semibold flex items-center gap-2"><Star className="text-primary"/> Significance</h3>
                                                    {Array.isArray(selectedFestival.details.significance) ? (
                                                        <ul className="list-disc pl-5 space-y-2">
                                                            {selectedFestival.details.significance.map((item, index) => <li key={index}>{item}</li>)}
                                                        </ul>
                                                    ) : (
                                                        <p>{selectedFestival.details.significance}</p>
                                                    )}
                                                </div>

                                                <div>
                                                    <h3 className="font-headline text-2xl font-semibold flex items-center gap-2"><CalendarDays className="text-primary"/> How It's Celebrated</h3>
                                                    {renderCelebration(selectedFestival.details.celebration)}
                                                </div>

                                                {selectedFestival.details.culturalElements && (
                                                     <div>
                                                        <h3 className="font-headline text-2xl font-semibold flex items-center gap-2"><Wind className="text-primary"/> Cultural Elements</h3>
                                                        <ul className="list-disc pl-5 space-y-2">
                                                            {selectedFestival.details.culturalElements.map((item, index) => <li key={index}>{item}</li>)}
                                                        </ul>
                                                    </div>
                                                )}
                                           </div>
                                       </div>
                                   ) : (
                                       <div className="flex flex-col items-center justify-center text-center p-8 rounded-lg bg-secondary/30 h-96">
                                            <Image src="https://placehold.co/600x400.png" data-ai-hint="indian culture" width={200} height={200} alt="A collage of Indian culture" className="rounded-lg mb-4 opacity-70"/>
                                            <p className="text-muted-foreground font-semibold max-w-xs">The stories and traditions of India's festivals are waiting to be explored.</p>
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

    