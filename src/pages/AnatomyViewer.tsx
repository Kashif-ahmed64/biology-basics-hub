import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AnatomyViewer3D from '@/components/AnatomyViewer3D';
import { User, Heart, Bone, Brain, Activity } from 'lucide-react';

type Layer = 'skin' | 'muscles' | 'skeleton' | 'organs';

const AnatomyViewer = () => {
  const [activeLayer, setActiveLayer] = useState<Layer>('skin');

  const layerInfo: Record<Layer, { title: string; description: string; facts: string[] }> = {
    skin: {
      title: 'Integumentary System',
      description: 'The skin is the largest organ of the body, providing protection, temperature regulation, and sensory information.',
      facts: [
        'Average adult skin weighs about 8 pounds (3.6 kg)',
        'Skin renews itself approximately every 28 days',
        'Contains over 11 miles of blood vessels',
        'Has three main layers: epidermis, dermis, and hypodermis'
      ]
    },
    muscles: {
      title: 'Muscular System',
      description: 'The muscular system consists of over 600 muscles that enable movement, maintain posture, and generate heat.',
      facts: [
        'Muscles make up about 40% of body weight',
        'The strongest muscle is the masseter (jaw muscle)',
        'Muscles can only pull, never push',
        'Cardiac muscle beats about 100,000 times per day'
      ]
    },
    skeleton: {
      title: 'Skeletal System',
      description: 'The skeletal system provides structure, protects organs, produces blood cells, and stores minerals.',
      facts: [
        'Adults have 206 bones; babies are born with about 270',
        'The femur (thigh bone) is the longest and strongest bone',
        'Bones are constantly being remodeled throughout life',
        'The human hand has 27 bones'
      ]
    },
    organs: {
      title: 'Organ Systems',
      description: 'Major organs work together in systems to perform essential life functions like circulation, digestion, and respiration.',
      facts: [
        'The heart pumps about 2,000 gallons of blood daily',
        'Lungs contain about 300 million air sacs (alveoli)',
        'The brain uses 20% of the body\'s energy',
        'The liver performs over 500 different functions'
      ]
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <div className="text-center mb-12 animate-fade-in">
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-gradient mb-4">
          3D Human Anatomy Viewer
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Explore the human body layer by layer. Interact with the 3D model to understand anatomical structures from different perspectives.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                Interactive 3D Model
              </CardTitle>
              <CardDescription>
                Drag to rotate • Scroll to zoom • Select layer below
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AnatomyViewer3D activeLayer={activeLayer} />
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
                <Button
                  variant={activeLayer === 'skin' ? 'default' : 'outline'}
                  className="gap-2"
                  onClick={() => setActiveLayer('skin')}
                >
                  <User className="h-4 w-4" />
                  Skin
                </Button>
                <Button
                  variant={activeLayer === 'muscles' ? 'default' : 'outline'}
                  className="gap-2"
                  onClick={() => setActiveLayer('muscles')}
                >
                  <Activity className="h-4 w-4" />
                  Muscles
                </Button>
                <Button
                  variant={activeLayer === 'skeleton' ? 'default' : 'outline'}
                  className="gap-2"
                  onClick={() => setActiveLayer('skeleton')}
                >
                  <Bone className="h-4 w-4" />
                  Skeleton
                </Button>
                <Button
                  variant={activeLayer === 'organs' ? 'default' : 'outline'}
                  className="gap-2"
                  onClick={() => setActiveLayer('organs')}
                >
                  <Heart className="h-4 w-4" />
                  Organs
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-primary" />
                {layerInfo[activeLayer].title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                {layerInfo[activeLayer].description}
              </p>
              
              <div>
                <h4 className="font-semibold mb-2">Key Facts:</h4>
                <ul className="space-y-2">
                  {layerInfo[activeLayer].facts.map((fact, index) => (
                    <li key={index} className="text-sm text-muted-foreground flex gap-2">
                      <span className="text-primary">•</span>
                      <span>{fact}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Tabs defaultValue="systems" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="systems">Body Systems</TabsTrigger>
          <TabsTrigger value="digestive">Digestive Process</TabsTrigger>
          <TabsTrigger value="firstaid">First Aid</TabsTrigger>
        </TabsList>
        
        <TabsContent value="systems" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Major Body Systems</CardTitle>
              <CardDescription>Learn about the interconnected systems that keep the body functioning</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { name: 'Circulatory System', desc: 'Heart, blood vessels, and blood transport' },
                  { name: 'Respiratory System', desc: 'Lungs and airways for gas exchange' },
                  { name: 'Nervous System', desc: 'Brain, spinal cord, and nerves for communication' },
                  { name: 'Digestive System', desc: 'Breakdown and absorption of nutrients' },
                  { name: 'Endocrine System', desc: 'Hormone production and regulation' },
                  { name: 'Immune System', desc: 'Defense against disease and infection' }
                ].map((system, idx) => (
                  <div key={idx} className="p-4 border rounded-lg hover:border-primary transition-colors">
                    <h4 className="font-semibold mb-1">{system.name}</h4>
                    <p className="text-sm text-muted-foreground">{system.desc}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="digestive" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Digestive System Journey</CardTitle>
              <CardDescription>Follow food through the digestive tract</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { step: 1, organ: 'Mouth', process: 'Mechanical digestion begins with chewing. Saliva contains enzymes that start breaking down carbohydrates.' },
                  { step: 2, organ: 'Esophagus', process: 'Food travels down through peristalsis (wave-like muscle contractions) to the stomach.' },
                  { step: 3, organ: 'Stomach', process: 'Gastric juices (HCl and pepsin) break down proteins. Food becomes a liquid mixture called chyme.' },
                  { step: 4, organ: 'Small Intestine', process: 'Nutrients are absorbed through villi. Bile from liver and enzymes from pancreas aid digestion.' },
                  { step: 5, organ: 'Large Intestine', process: 'Water and minerals are absorbed. Beneficial bacteria help break down remaining material.' },
                  { step: 6, organ: 'Rectum & Anus', process: 'Waste products are stored and eliminated from the body.' }
                ].map((stage) => (
                  <div key={stage.step} className="flex gap-4 p-4 border rounded-lg">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                      {stage.step}
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">{stage.organ}</h4>
                      <p className="text-sm text-muted-foreground">{stage.process}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="firstaid" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>First Aid Training</CardTitle>
              <CardDescription>Essential emergency response procedures</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Note: These are basic guidelines. Always seek professional medical training for proper certification.
              </p>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Activity className="h-4 w-4 text-primary" />
                    CPR (Cardiopulmonary Resuscitation)
                  </h4>
                  <ol className="space-y-2 ml-4">
                    <li className="text-sm">1. Check for responsiveness and breathing</li>
                    <li className="text-sm">2. Call emergency services (or have someone else call)</li>
                    <li className="text-sm">3. Place hands on center of chest, interlock fingers</li>
                    <li className="text-sm">4. Push hard and fast: 100-120 compressions per minute</li>
                    <li className="text-sm">5. Compress at least 2 inches (5 cm) deep</li>
                    <li className="text-sm">6. Give 2 rescue breaths after every 30 compressions</li>
                    <li className="text-sm">7. Continue until help arrives or person responds</li>
                  </ol>
                </div>

                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Heart className="h-4 w-4 text-primary" />
                    Controlling Bleeding
                  </h4>
                  <ol className="space-y-2 ml-4">
                    <li className="text-sm">1. Put on gloves if available (protect yourself)</li>
                    <li className="text-sm">2. Apply direct pressure with clean cloth or bandage</li>
                    <li className="text-sm">3. Maintain pressure for 10-15 minutes without checking</li>
                    <li className="text-sm">4. Elevate the injured area above heart level if possible</li>
                    <li className="text-sm">5. If bleeding soaks through, add more cloth (don't remove original)</li>
                    <li className="text-sm">6. Apply pressure bandage once bleeding is controlled</li>
                    <li className="text-sm">7. Seek medical help for severe bleeding</li>
                  </ol>
                </div>

                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <User className="h-4 w-4 text-primary" />
                    Giving an Injection (Intramuscular)
                  </h4>
                  <ol className="space-y-2 ml-4">
                    <li className="text-sm">1. Wash hands thoroughly and put on gloves</li>
                    <li className="text-sm">2. Check medication label, dose, and expiration date</li>
                    <li className="text-sm">3. Choose injection site (upper arm, thigh, or buttock)</li>
                    <li className="text-sm">4. Clean site with alcohol swab in circular motion</li>
                    <li className="text-sm">5. Remove needle cap, hold syringe like a dart</li>
                    <li className="text-sm">6. Insert needle at 90-degree angle with quick motion</li>
                    <li className="text-sm">7. Inject medication slowly and steadily</li>
                    <li className="text-sm">8. Remove needle quickly, apply pressure with cotton ball</li>
                    <li className="text-sm">9. Dispose of needle in sharps container</li>
                  </ol>
                  <p className="text-xs text-muted-foreground mt-2 italic">
                    ⚠️ Only administer injections with proper medical training and authorization
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnatomyViewer;
