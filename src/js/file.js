import {
  debugLog,
  getRandomDate,
  getRandomString,
  getRandomHexString,
} from './misc';

const wordlist = ['abandon', 'ability', 'about', 'above', 'abroad', 'absolute', 'absolutely', 'academic', 'accept', 'acceptable', 'access', 'accident', 'accommodation', 'accompany', 'according to', 'account', 'accurate', 'accuse', 'achieve', 'achievement', 'acknowledge', 'acquire', 'across', 'action', 'active', 'activity', 'actor', 'actress', 'actual', 'actually', 'adapt', 'addition', 'additional', 'address', 'administration', 'admire', 'admit', 'adopt', 'adult', 'advance', 'advanced', 'advantage', 'adventure', 'advertise', 'advertisement', 'advertising', 'advice', 'advise', 'affair', 'affect', 'afford', 'afraid', 'after', 'afternoon', 'afterwards', 'again', 'against', 'agency', 'agenda', 'agent', 'aggressive', 'agree', 'agreement', 'ahead', 'aircraft', 'airline', 'airport', 'alarm', 'album', 'alcohol', 'alcoholic', 'alive', 'all right', 'allow', 'almost', 'alone', 'along', 'already', 'alter', 'alternative', 'although', 'always', 'amazed', 'amazing', 'ambition', 'ambitious', 'among', 'amount', 'analyse', 'analysis', 'ancient', 'anger', 'angle', 'angrily', 'angry', 'animal', 'ankle', 'anniversary', 'announce', 'announcement', 'annoy', 'annoyed', 'annoying', 'annual', 'another', 'answer', 'anxious', 'any more', 'anybody', 'anyone', 'anything', 'anyway', 'anywhere', 'apart', 'apartment', 'apologize', 'apparent', 'apparently', 'appeal', 'appear', 'appearance', 'apple', 'application', 'apply', 'appointment', 'appreciate', 'approach', 'appropriate', 'approval', 'approve', 'approximately', 'april', 'architect', 'architecture', 'argue', 'argument', 'arise', 'armed', 'around', 'arrange', 'arrangement', 'arrest', 'arrival', 'arrive', 'article', 'artificial', 'artist', 'artistic', 'ashamed', 'asleep', 'aspect', 'assess', 'assessment', 'assignment', 'assist', 'assistant', 'associate', 'associated', 'association', 'assume', 'athlete', 'atmosphere', 'attach', 'attack', 'attempt', 'attend', 'attention', 'attitude', 'attract', 'attraction', 'attractive', 'audience', 'august', 'author', 'authority', 'autumn', 'available', 'average', 'avoid', 'award', 'aware', 'awful', 'background', 'backwards', 'bacteria', 'badly', 'balance', 'banana', 'barrier', 'baseball', 'based', 'basic', 'basically', 'basis', 'basketball', 'bathroom', 'battery', 'battle', 'beach', 'beautiful', 'beauty', 'because', 'become', 'bedroom', 'before', 'begin', 'beginning', 'behave', 'behaviour', 'behind', 'being', 'belief', 'believe', 'belong', 'below', 'benefit', 'better', 'between', 'beyond', 'bicycle', 'billion', 'biology', 'birth', 'birthday', 'biscuit', 'bitter', 'black', 'blame', 'blank', 'blind', 'block', 'blonde', 'blood', 'board', 'border', 'bored', 'boring', 'borrow', 'bother', 'bottle', 'bottom', 'boyfriend', 'brain', 'branch', 'brand', 'brave', 'bread', 'break', 'breakfast', 'breast', 'breath', 'breathe', 'breathing', 'bride', 'bridge', 'brief', 'bright', 'brilliant', 'bring', 'broad', 'broadcast', 'broken', 'brother', 'brown', 'brush', 'bubble', 'budget', 'build', 'building', 'bullet', 'bunch', 'business', 'businessman', 'butter', 'button', 'cable', 'calculate', 'camera', 'campaign', 'camping', 'campus', 'cancel', 'cancer', 'candidate', 'cannot', 'capable', 'capacity', 'capital', 'captain', 'capture', 'career', 'careful', 'carefully', 'careless', 'carpet', 'carrot', 'carry', 'cartoon', 'castle', 'catch', 'category', 'cause', 'ceiling', 'celebrate', 'celebration', 'celebrity', 'central', 'centre', 'century', 'ceremony', 'certain', 'certainly', 'chain', 'chair', 'chairman', 'challenge', 'champion', 'chance', 'change', 'channel', 'chapter', 'character', 'characteristic', 'charge', 'charity', 'chart', 'cheap', 'cheat', 'check', 'cheerful', 'cheese', 'chemical', 'chemistry', 'chest', 'chicken', 'chief', 'child', 'childhood', 'chocolate', 'choice', 'choose', 'church', 'cigarette', 'cinema', 'circle', 'circumstance', 'citizen', 'civil', 'claim', 'class', 'classic', 'classical', 'classroom', 'clause', 'clean', 'clear', 'clearly', 'clever', 'click', 'client', 'climate', 'climb', 'clock', 'close', 'closed', 'closely', 'cloth', 'clothes', 'clothing', 'cloud', 'coach', 'coast', 'coffee', 'collapse', 'colleague', 'collect', 'collection', 'college', 'colour', 'coloured', 'column', 'combination', 'combine', 'comedy', 'comfort', 'comfortable', 'command', 'comment', 'commercial', 'commission', 'commit', 'commitment', 'committee', 'common', 'commonly', 'communicate', 'communication', 'community', 'company', 'compare', 'comparison', 'compete', 'competition', 'competitive', 'competitor', 'complain', 'complaint', 'complete', 'completely', 'complex', 'complicated', 'component', 'computer', 'concentrate', 'concentration', 'concept', 'concern', 'concerned', 'concert', 'conclude', 'conclusion', 'condition', 'conduct', 'conference', 'confidence', 'confident', 'confirm', 'conflict', 'confuse', 'confused', 'confusing', 'connect', 'connected', 'connection', 'conscious', 'consequence', 'conservative', 'consider', 'consideration', 'consist', 'consistent', 'constant', 'constantly', 'construct', 'construction', 'consume', 'consumer', 'contact', 'contain', 'container', 'contemporary', 'content', 'contest', 'context', 'continent', 'continue', 'continuous', 'contract', 'contrast', 'contribute', 'contribution', 'control', 'convenient', 'conversation', 'convert', 'convince', 'convinced', 'cooker', 'cooking', 'corner', 'corporate', 'correct', 'correctly', 'costume', 'cottage', 'cotton', 'could', 'council', 'count', 'country', 'countryside', 'county', 'couple', 'courage', 'course', 'court', 'cousin', 'cover', 'covered', 'crash', 'crazy', 'cream', 'create', 'creation', 'creative', 'creature', 'credit', 'crime', 'criminal', 'crisis', 'criterion', 'critic', 'critical', 'criticism', 'criticize', 'cross', 'crowd', 'crowded', 'crucial', 'cruel', 'cultural', 'culture', 'cupboard', 'curly', 'currency', 'current', 'currently', 'curtain', 'curve', 'curved', 'custom', 'customer', 'cycle', 'daily', 'damage', 'dance', 'dancer', 'dancing', 'danger', 'dangerous', 'daughter', 'death', 'debate', 'decade', 'december', 'decent', 'decide', 'decision', 'declare', 'decline', 'decorate', 'decoration', 'decrease', 'deeply', 'defeat', 'defence', 'defend', 'define', 'definite', 'definitely', 'definition', 'degree', 'delay', 'deliberate', 'deliberately', 'delicious', 'delight', 'delighted', 'deliver', 'delivery', 'demand', 'demonstrate', 'dentist', 'department', 'departure', 'depend', 'depressed', 'depressing', 'depth', 'describe', 'description', 'desert', 'deserve', 'design', 'designer', 'desire', 'desperate', 'despite', 'destination', 'destroy', 'detail', 'detailed', 'detect', 'detective', 'determine', 'determined', 'develop', 'development', 'device', 'diagram', 'dialogue', 'diamond', 'diary', 'dictionary', 'difference', 'different', 'differently', 'difficult', 'difficulty', 'digital', 'dinner', 'direct', 'direction', 'directly', 'director', 'dirty', 'disadvantage', 'disagree', 'disappear', 'disappointed', 'disappointing', 'disaster', 'discipline', 'discount', 'discover', 'discovery', 'discuss', 'discussion', 'disease', 'dishonest', 'dislike', 'dismiss', 'display', 'distance', 'distribute', 'distribution', 'district', 'divide', 'division', 'divorced', 'doctor', 'document', 'documentary', 'dollar', 'domestic', 'dominate', 'donate', 'double', 'doubt', 'download', 'downstairs', 'downwards', 'dozen', 'draft', 'drama', 'dramatic', 'drawing', 'dream', 'dress', 'dressed', 'drink', 'drive', 'driver', 'driving', 'drunk', 'during', 'early', 'earth', 'earthquake', 'easily', 'eastern', 'economic', 'economy', 'edition', 'editor', 'educate', 'educated', 'education', 'educational', 'effect', 'effective', 'effectively', 'efficient', 'effort', 'eight', 'eighteen', 'eighty', 'either', 'elderly', 'elect', 'election', 'electric', 'electrical', 'electricity', 'electronic', 'element', 'elephant', 'eleven', 'elsewhere', 'email', 'embarrassed', 'embarrassing', 'emerge', 'emergency', 'emotion', 'emotional', 'emphasis', 'emphasize', 'employ', 'employee', 'employer', 'employment', 'empty', 'enable', 'encounter', 'encourage', 'ending', 'enemy', 'energy', 'engage', 'engaged', 'engine', 'engineer', 'engineering', 'enhance', 'enjoy', 'enormous', 'enough', 'enquiry', 'ensure', 'enter', 'entertain', 'entertainment', 'enthusiasm', 'enthusiastic', 'entire', 'entirely', 'entrance', 'entry', 'environment', 'environmental', 'episode', 'equal', 'equally', 'equipment', 'error', 'escape', 'especially', 'essay', 'essential', 'establish', 'estate', 'estimate', 'ethical', 'evaluate', 'evening', 'event', 'eventually', 'every', 'everybody', 'everyday', 'everyone', 'everything', 'everywhere', 'evidence', 'exact', 'exactly', 'examination', 'examine', 'example', 'excellent', 'except', 'exchange', 'excited', 'excitement', 'exciting', 'excuse', 'executive', 'exercise', 'exhibition', 'exist', 'existence', 'expand', 'expect', 'expectation', 'expected', 'expedition', 'expense', 'expensive', 'experience', 'experienced', 'experiment', 'expert', 'explain', 'explanation', 'explode', 'exploration', 'explore', 'explosion', 'export', 'expose', 'express', 'expression', 'extend', 'extent', 'external', 'extra', 'extraordinary', 'extreme', 'extremely', 'facility', 'factor', 'factory', 'failure', 'fairly', 'faith', 'FALSE', 'familiar', 'family', 'famous', 'fancy', 'fantastic', 'farmer', 'farming', 'fascinating', 'fashion', 'fashionable', 'fasten', 'father', 'fault', 'favour', 'favourite', 'feather', 'feature', 'february', 'feedback', 'feeling', 'fellow', 'female', 'fence', 'festival', 'fiction', 'field', 'fifteen', 'fifth', 'fifty', 'fight', 'fighting', 'figure', 'final', 'finally', 'finance', 'financial', 'finding', 'finger', 'finish', 'first', 'firstly', 'fishing', 'fitness', 'fixed', 'flame', 'flash', 'flexible', 'flight', 'float', 'flood', 'floor', 'flour', 'flower', 'flying', 'focus', 'folding', 'follow', 'following', 'football', 'force', 'foreign', 'forest', 'forever', 'forget', 'forgive', 'formal', 'former', 'fortunately', 'fortune', 'forty', 'forward', 'found', 'fourteen', 'fourth', 'frame', 'freedom', 'freeze', 'frequency', 'frequently', 'fresh', 'friday', 'fridge', 'friend', 'friendly', 'friendship', 'frighten', 'frightened', 'frightening', 'front', 'frozen', 'fruit', 'fully', 'function', 'fundamental', 'funding', 'funny', 'furniture', 'further', 'furthermore', 'future', 'gallery', 'garage', 'garden', 'gather', 'general', 'generally', 'generate', 'generation', 'generous', 'genre', 'gentle', 'gentleman', 'geography', 'ghost', 'giant', 'girlfriend', 'glass', 'global', 'glove', 'goodbye', 'goods', 'govern', 'government', 'grade', 'gradually', 'graduate', 'grain', 'grand', 'grandfather', 'grandmother', 'grandparent', 'grant', 'grass', 'grateful', 'great', 'green', 'greet', 'ground', 'group', 'growth', 'guarantee', 'guard', 'guess', 'guest', 'guide', 'guilty', 'guitar', 'habit', 'handle', 'happen', 'happily', 'happiness', 'happy', 'hardly', 'harmful', 'have to', 'headache', 'headline', 'health', 'healthy', 'hearing', 'heart', 'heating', 'heaven', 'heavily', 'heavy', 'height', 'helicopter', 'hello', 'helpful', 'herself', 'hesitate', 'highlight', 'highly', 'himself', 'historic', 'historical', 'history', 'hobby', 'hockey', 'holiday', 'hollow', 'homework', 'honest', 'honour', 'horrible', 'horror', 'horse', 'hospital', 'hotel', 'house', 'household', 'housing', 'however', 'human', 'humorous', 'humour', 'hundred', 'hungry', 'hunting', 'hurricane', 'hurry', 'husband', 'ice cream', 'ideal', 'identify', 'identity', 'ignore', 'illegal', 'illness', 'illustrate', 'illustration', 'image', 'imaginary', 'imagination', 'imagine', 'immediate', 'immediately', 'immigrant', 'impact', 'impatient', 'imply', 'import', 'importance', 'important', 'impose', 'impossible', 'impress', 'impressed', 'impression', 'impressive', 'improve', 'improvement', 'incident', 'include', 'included', 'including', 'income', 'increase', 'increasingly', 'incredible', 'incredibly', 'indeed', 'independent', 'indicate', 'indirect', 'individual', 'indoor', 'indoors', 'industrial', 'industry', 'infection', 'influence', 'inform', 'informal', 'information', 'ingredient', 'initial', 'initially', 'initiative', 'injure', 'injured', 'injury', 'inner', 'innocent', 'insect', 'inside', 'insight', 'insist', 'inspire', 'install', 'instance', 'instead', 'institute', 'institution', 'instruction', 'instructor', 'instrument', 'insurance', 'intelligence', 'intelligent', 'intend', 'intended', 'intense', 'intention', 'interest', 'interested', 'interesting', 'internal', 'international', 'internet', 'interpret', 'interrupt', 'interview', 'introduce', 'introduction', 'invent', 'invention', 'invest', 'investigate', 'investigation', 'investment', 'invitation', 'invite', 'involve', 'involved', 'island', 'issue', 'itself', 'jacket', 'january', 'jeans', 'jewellery', 'journal', 'journalist', 'journey', 'judge', 'judgement', 'juice', 'junior', 'justice', 'justify', 'keyboard', 'killing', 'kilometre', 'kitchen', 'knife', 'knock', 'knowledge', 'label', 'laboratory', 'labour', 'landscape', 'language', 'laptop', 'large', 'largely', 'later', 'latest', 'laugh', 'laughter', 'launch', 'lawyer', 'layer', 'leader', 'leadership', 'leading', 'league', 'learn', 'learning', 'least', 'leather', 'leave', 'lecture', 'legal', 'leisure', 'lemon', 'length', 'lesson', 'letter', 'level', 'library', 'licence', 'lifestyle', 'light', 'likely', 'limit', 'limited', 'liquid', 'listen', 'listener', 'literature', 'little', 'lively', 'living', 'local', 'locate', 'located', 'location', 'logical', 'lonely', 'long-term', 'loose', 'lorry', 'loudly', 'lovely', 'lower', 'lucky', 'lunch', 'luxury', 'machine', 'magazine', 'magic', 'mainly', 'maintain', 'major', 'majority', 'manage', 'management', 'manager', 'manner', 'march', 'market', 'marketing', 'marriage', 'married', 'marry', 'massive', 'master', 'match', 'matching', 'material', 'mathematics', 'maths', 'matter', 'maximum', 'maybe', 'meaning', 'means', 'meanwhile', 'measure', 'measurement', 'media', 'medical', 'medicine', 'medium', 'meeting', 'member', 'memory', 'mental', 'mention', 'message', 'metal', 'method', 'metre', 'middle', 'midnight', 'might', 'military', 'million', 'mineral', 'minimum', 'minister', 'minor', 'minority', 'minute', 'mirror', 'missing', 'mission', 'mistake', 'mixed', 'mixture', 'mobile', 'model', 'modern', 'modify', 'moment', 'monday', 'money', 'monitor', 'monkey', 'month', 'moral', 'morning', 'mostly', 'mother', 'motor', 'motorcycle', 'mount', 'mountain', 'mouse', 'mouth', 'movement', 'movie', 'multiple', 'multiply', 'murder', 'muscle', 'museum', 'music', 'musical', 'musician', 'myself', 'mysterious', 'mystery', 'narrative', 'narrow', 'nation', 'national', 'native', 'natural', 'naturally', 'nature', 'nearly', 'necessarily', 'necessary', 'needle', 'negative', 'neighbour', 'neighbourhood', 'neither', 'nerve', 'nervous', 'network', 'never', 'nevertheless', 'newspaper', 'next to', 'night', 'nightmare', 'nineteen', 'ninety', 'no one', 'nobody', 'noise', 'noisy', 'normal', 'normally', 'north', 'northern', 'nothing', 'notice', 'notion', 'novel', 'november', 'nowhere', 'nuclear', 'number', 'numerous', 'nurse', "o'clock", 'object', 'objective', 'obligation', 'observation', 'observe', 'obtain', 'obvious', 'obviously', 'occasion', 'occasionally', 'occur', 'ocean', 'october', 'offence', 'offend', 'offensive', 'offer', 'office', 'officer', 'official', 'often', 'old-fashioned', 'onion', 'online', 'opening', 'operate', 'operation', 'opinion', 'opponent', 'opportunity', 'oppose', 'opposed', 'opposite', 'opposition', 'option', 'orange', 'order', 'ordinary', 'organ', 'organization', 'organize', 'organized', 'organizer', 'origin', 'original', 'originally', 'other', 'otherwise', 'ought', 'ourselves', 'outcome', 'outdoor', 'outdoors', 'outer', 'outline', 'outside', 'overall', 'owner', 'package', 'painful', 'paint', 'painter', 'painting', 'palace', 'panel', 'pants', 'paper', 'paragraph', 'parent', 'parking', 'parliament', 'participant', 'participate', 'particular', 'particularly', 'partly', 'partner', 'party', 'passage', 'passenger', 'passion', 'passport', 'patient', 'pattern', 'payment', 'peace', 'peaceful', 'pencil', 'penny', 'pension', 'people', 'pepper', 'per cent', 'percentage', 'perfect', 'perfectly', 'perform', 'performance', 'perhaps', 'period', 'permanent', 'permission', 'permit', 'person', 'personal', 'personality', 'personally', 'perspective', 'persuade', 'petrol', 'phase', 'phenomenon', 'philosophy', 'phone', 'photo', 'photograph', 'photographer', 'photography', 'phrase', 'physical', 'physics', 'piano', 'picture', 'piece', 'pilot', 'pitch', 'place', 'plain', 'plane', 'planet', 'planning', 'plant', 'plastic', 'plate', 'platform', 'player', 'pleasant', 'please', 'pleased', 'pleasure', 'plenty', 'pocket', 'poetry', 'point', 'pointed', 'poison', 'poisonous', 'police', 'policeman', 'policy', 'polite', 'political', 'politician', 'politics', 'pollution', 'popular', 'popularity', 'population', 'portrait', 'position', 'positive', 'possess', 'possession', 'possibility', 'possible', 'possibly', 'poster', 'potato', 'potential', 'pound', 'poverty', 'powder', 'power', 'powerful', 'practical', 'practice', 'practise', 'praise', 'prayer', 'predict', 'prediction', 'prefer', 'pregnant', 'preparation', 'prepare', 'prepared', 'presence', 'present', 'presentation', 'preserve', 'president', 'press', 'pressure', 'pretend', 'pretty', 'prevent', 'previous', 'previously', 'price', 'priest', 'primary', 'prime', 'prince', 'princess', 'principle', 'print', 'printer', 'printing', 'priority', 'prison', 'prisoner', 'privacy', 'private', 'prize', 'probably', 'problem', 'procedure', 'process', 'produce', 'producer', 'product', 'production', 'profession', 'professional', 'professor', 'profile', 'profit', 'program', 'programme', 'progress', 'project', 'promise', 'promote', 'pronounce', 'proof', 'proper', 'properly', 'property', 'proposal', 'propose', 'prospect', 'protect', 'protection', 'protest', 'proud', 'prove', 'provide', 'psychologist', 'psychology', 'public', 'publication', 'publish', 'punish', 'punishment', 'pupil', 'purchase', 'purple', 'purpose', 'pursue', 'qualification', 'qualified', 'qualify', 'quality', 'quantity', 'quarter', 'queen', 'question', 'queue', 'quick', 'quickly', 'quiet', 'quietly', 'quite', 'quotation', 'quote', 'racing', 'radio', 'railway', 'raise', 'range', 'rapid', 'rapidly', 'rarely', 'rather', 'reach', 'react', 'reaction', 'reader', 'reading', 'ready', 'realistic', 'reality', 'realize', 'really', 'reason', 'reasonable', 'recall', 'receipt', 'receive', 'recent', 'recently', 'reception', 'recipe', 'recognize', 'recommend', 'recommendation', 'record', 'recording', 'recover', 'recycle', 'reduce', 'reduction', 'refer', 'reference', 'reflect', 'refuse', 'regard', 'region', 'regional', 'register', 'regret', 'regular', 'regularly', 'regulation', 'reject', 'relate', 'related', 'relation', 'relationship', 'relative', 'relatively', 'relax', 'relaxed', 'relaxing', 'release', 'relevant', 'reliable', 'relief', 'religion', 'religious', 'remain', 'remark', 'remember', 'remind', 'remote', 'remove', 'repair', 'repeat', 'repeated', 'replace', 'reply', 'report', 'reporter', 'represent', 'representative', 'reputation', 'request', 'require', 'requirement', 'rescue', 'research', 'researcher', 'reservation', 'reserve', 'resident', 'resist', 'resolve', 'resort', 'resource', 'respect', 'respond', 'response', 'responsibility', 'responsible', 'restaurant', 'result', 'retain', 'retire', 'retired', 'return', 'reveal', 'review', 'revise', 'revolution', 'reward', 'rhythm', 'right', 'river', 'robot', 'romantic', 'rough', 'round', 'route', 'routine', 'royal', 'rubber', 'rubbish', 'rugby', 'runner', 'running', 'rural', 'sadly', 'safety', 'sailing', 'sailor', 'salad', 'salary', 'sample', 'sandwich', 'satellite', 'satisfied', 'satisfy', 'saturday', 'sauce', 'saving', 'scale', 'scared', 'scary', 'scene', 'schedule', 'scheme', 'school', 'science', 'scientific', 'scientist', 'score', 'scream', 'screen', 'script', 'sculpture', 'search', 'season', 'second', 'secondary', 'secondly', 'secret', 'secretary', 'section', 'sector', 'secure', 'security', 'select', 'selection', 'senior', 'sense', 'sensible', 'sensitive', 'sentence', 'separate', 'september', 'sequence', 'series', 'serious', 'seriously', 'servant', 'serve', 'service', 'session', 'setting', 'settle', 'seven', 'seventeen', 'seventy', 'several', 'severe', 'sexual', 'shade', 'shadow', 'shake', 'shall', 'shallow', 'shame', 'shape', 'share', 'sharp', 'sheep', 'sheet', 'shelf', 'shell', 'shelter', 'shift', 'shine', 'shiny', 'shirt', 'shock', 'shocked', 'shoot', 'shooting', 'shopping', 'short', 'should', 'shoulder', 'shout', 'shower', 'sight', 'signal', 'significant', 'significantly', 'silence', 'silent', 'silly', 'silver', 'similar', 'similarity', 'similarly', 'simple', 'simply', 'since', 'sincere', 'singer', 'singing', 'single', 'sister', 'situation', 'sixteen', 'sixty', 'skiing', 'skill', 'skirt', 'slave', 'sleep', 'slice', 'slide', 'slight', 'slightly', 'slope', 'slowly', 'small', 'smart', 'smell', 'smile', 'smoke', 'smoking', 'smooth', 'snake', 'soccer', 'social', 'society', 'software', 'solar', 'soldier', 'solid', 'solution', 'solve', 'somebody', 'someone', 'something', 'sometimes', 'somewhat', 'somewhere', 'sorry', 'sound', 'source', 'south', 'southern', 'space', 'speak', 'speaker', 'special', 'specialist', 'species', 'specific', 'specifically', 'speech', 'speed', 'spell', 'spelling', 'spend', 'spending', 'spicy', 'spider', 'spirit', 'spiritual', 'split', 'spoken', 'sponsor', 'spoon', 'sport', 'spread', 'spring', 'square', 'stable', 'stadium', 'staff', 'stage', 'stair', 'stamp', 'stand', 'standard', 'stare', 'start', 'state', 'statement', 'station', 'statistic', 'statue', 'status', 'steady', 'steal', 'steel', 'steep', 'stick', 'sticky', 'stiff', 'still', 'stock', 'stomach', 'stone', 'store', 'storm', 'story', 'straight', 'strange', 'stranger', 'strategy', 'stream', 'street', 'strength', 'stress', 'stretch', 'strict', 'strike', 'string', 'strong', 'strongly', 'structure', 'struggle', 'student', 'studio', 'study', 'stuff', 'stupid', 'style', 'subject', 'sublist', 'submit', 'substance', 'succeed', 'success', 'successful', 'successfully', 'sudden', 'suddenly', 'suffer', 'sugar', 'suggest', 'suggestion', 'suitable', 'summarize', 'summary', 'summer', 'sunday', 'supermarket', 'supply', 'support', 'supporter', 'suppose', 'surely', 'surface', 'surgery', 'surprise', 'surprised', 'surprising', 'surround', 'surrounding', 'survey', 'survive', 'suspect', 'swear', 'sweater', 'sweep', 'sweet', 'swimming', 'switch', 'symbol', 'sympathy', 'symptom', 'system', 't-shirt', 'table', 'tablet', 'talent', 'talented', 'target', 'taste', 'teach', 'teacher', 'teaching', 'technical', 'technique', 'technology', 'teenage', 'teenager', 'telephone', 'television', 'temperature', 'temporary', 'tennis', 'terrible', 'thank', 'thanks', 'theatre', 'their', 'theirs', 'theme', 'themselves', 'theory', 'therapy', 'there', 'therefore', 'thick', 'thief', 'thing', 'think', 'thinking', 'third', 'thirsty', 'thirteen', 'thirty', 'though', 'thought', 'thousand', 'threat', 'threaten', 'three', 'throat', 'through', 'throughout', 'throw', 'thursday', 'ticket', 'tight', 'tired', 'title', 'today', 'together', 'toilet', 'tomato', 'tomorrow', 'tongue', 'tonight', 'tooth', 'topic', 'total', 'totally', 'touch', 'tough', 'tourism', 'tourist', 'towards', 'towel', 'tower', 'track', 'trade', 'tradition', 'traditional', 'traffic', 'train', 'trainer', 'training', 'transfer', 'transform', 'transition', 'translate', 'translation', 'transport', 'travel', 'traveller', 'treat', 'treatment', 'trend', 'trial', 'trick', 'tropical', 'trouble', 'trousers', 'truck', 'truly', 'trust', 'truth', 'tuesday', 'tunnel', 'twelve', 'twenty', 'twice', 'typical', 'typically', 'ultimately', 'umbrella', 'unable', 'uncle', 'uncomfortable', 'unconscious', 'under', 'underground', 'understand', 'understanding', 'underwear', 'unemployed', 'unemployment', 'unexpected', 'unfair', 'unfortunately', 'unhappy', 'uniform', 'union', 'unique', 'united', 'universe', 'university', 'unknown', 'unless', 'unlike', 'unlikely', 'unnecessary', 'unpleasant', 'until', 'unusual', 'update', 'upper', 'upset', 'upstairs', 'upwards', 'urban', 'used to', 'useful', 'usual', 'usually', 'vacation', 'valley', 'valuable', 'value', 'variety', 'various', 'vegetable', 'vehicle', 'venue', 'version', 'victim', 'victory', 'video', 'viewer', 'village', 'violence', 'violent', 'virtual', 'virus', 'vision', 'visit', 'visitor', 'visual', 'vital', 'vitamin', 'voice', 'volume', 'volunteer', 'waiter', 'warning', 'washing', 'waste', 'watch', 'water', 'weakness', 'wealth', 'wealthy', 'weapon', 'weather', 'website', 'wedding', 'wednesday', 'weekend', 'weigh', 'weight', 'welcome', 'western', 'whatever', 'wheel', 'whenever', 'where', 'whereas', 'wherever', 'whether', 'which', 'while', 'whisper', 'white', 'whole', 'whose', 'widely', 'wildlife', 'willing', 'window', 'winner', 'winter', 'within', 'without', 'witness', 'woman', 'wonder', 'wonderful', 'wooden', 'worker', 'working', 'world', 'worldwide', 'worried', 'worry', 'worse', 'worst', 'worth', 'would', 'wound', 'write', 'writer', 'writing', 'written', 'wrong', 'yellow', 'yesterday', 'young', 'yours', 'yourself', 'youth', 'abolish', 'abortion', 'absence', 'absent', 'absorb', 'abstract', 'absurd', 'abundance', 'abuse', 'academy', 'accelerate', 'accent', 'acceptance', 'accessible', 'accidentally', 'accommodate', 'accomplish', 'accomplishment', 'accordance', 'accordingly', 'accountability', 'accountable', 'accountant', 'accounting', 'accumulate', 'accumulation', 'accuracy', 'accurately', 'accusation', 'accused', 'acquisition', 'activate', 'activation', 'activist', 'acute', 'adaptation', 'addiction', 'additionally', 'adequate', 'adequately', 'adhere', 'adjacent', 'adjust', 'adjustment', 'administer', 'administrative', 'administrator', 'admission', 'adolescent', 'adoption', 'adverse', 'advocate', 'aesthetic', 'affection', 'affordable', 'aftermath', 'aggression', 'agricultural', 'agriculture', 'albeit', 'alert', 'alien', 'align', 'alignment', 'alike', 'allegation', 'allege', 'allegedly', 'alliance', 'allocate', 'allocation', 'allowance', 'alongside', 'altogether', 'aluminium', 'amateur', 'ambassador', 'ambulance', 'amend', 'amendment', 'amusing', 'analogy', 'analyst', 'ancestor', 'anchor', 'angel', 'animation', 'annually', 'anonymous', 'anticipate', 'anxiety', 'apology', 'apparatus', 'appealing', 'appetite', 'applaud', 'applicable', 'applicant', 'appoint', 'appreciation', 'appropriately', 'arbitrary', 'architectural', 'archive', 'arena', 'arguably', 'array', 'arrow', 'articulate', 'artwork', 'aside', 'aspiration', 'aspire', 'assassination', 'assault', 'assemble', 'assembly', 'assert', 'assertion', 'asset', 'assign', 'assistance', 'assumption', 'assurance', 'assure', 'astonishing', 'asylum', 'atrocity', 'attachment', 'attain', 'attendance', 'attorney', 'attribute', 'auction', 'audio', 'audit', 'authentic', 'authorize', 'automatic', 'automatically', 'autonomy', 'availability', 'await', 'awareness', 'awkward', 'backdrop', 'backing', 'backup', 'badge', 'balanced', 'ballet', 'balloon', 'ballot', 'banner', 'barely', 'bargain', 'barrel', 'basement', 'basket', 'battlefield', 'beast', 'behalf', 'beloved', 'bench', 'benchmark', 'beneath', 'beneficial', 'beneficiary', 'beside', 'besides', 'betray', 'biography', 'biological', 'bishop', 'bizarre', 'blade', 'blanket', 'blast', 'bleed', 'blend', 'bless', 'blessing', 'boast', 'bombing', 'bonus', 'booking', 'boost', 'bounce', 'bound', 'boundary', 'breach', 'breakdown', 'breakthrough', 'breed', 'brick', 'briefly', 'broadband', 'broadcaster', 'broadly', 'browser', 'brutal', 'buddy', 'buffer', 'burden', 'bureaucracy', 'burial', 'burst', 'cabin', 'cabinet', 'calculation', 'canal', 'candle', 'canvas', 'capability', 'capitalism', 'capitalist', 'carbon', 'cargo', 'carriage', 'carve', 'casino', 'casual', 'casualty', 'catalogue', 'cater', 'cattle', 'caution', 'cautious', 'cease', 'cemetery', 'certainty', 'certificate', 'challenging', 'chamber', 'championship', 'chaos', 'characterize', 'charm', 'charming', 'charter', 'chase', 'cheek', 'cheer', 'choir', 'chronic', 'chunk', 'circuit', 'circulate', 'circulation', 'citizenship', 'civic', 'civilian', 'civilization', 'clarify', 'clarity', 'clash', 'classification', 'classify', 'cleaning', 'clerk', 'cliff', 'cling', 'clinic', 'clinical', 'closure', 'cluster', 'coalition', 'coastal', 'cocktail', 'cognitive', 'coincide', 'coincidence', 'collaborate', 'collaboration', 'collective', 'collector', 'collision', 'colonial', 'colony', 'colourful', 'columnist', 'combat', 'comic', 'commander', 'commence', 'commentary', 'commentator', 'commerce', 'commissioner', 'commodity', 'communist', 'companion', 'comparable', 'comparative', 'compassion', 'compel', 'compelling', 'compensate', 'compensation', 'competence', 'competent', 'compile', 'complement', 'completion', 'complexity', 'compliance', 'complication', 'comply', 'compose', 'composer', 'composition', 'compound', 'comprehensive', 'comprise', 'compromise', 'compulsory', 'compute', 'conceal', 'concede', 'conceive', 'conception', 'concession', 'concrete', 'condemn', 'confer', 'confess', 'confession', 'configuration', 'confine', 'confirmation', 'confront', 'confrontation', 'confusion', 'congratulate', 'congregation', 'congressional', 'conquer', 'conscience', 'consciousness', 'consecutive', 'consensus', 'consent', 'consequently', 'conservation', 'conserve', 'considerable', 'considerably', 'consistency', 'consistently', 'consolidate', 'conspiracy', 'constituency', 'constitute', 'constitution', 'constitutional', 'constraint', 'consult', 'consultant', 'consultation', 'consumption', 'contemplate', 'contempt', 'contend', 'contender', 'content', 'contention', 'continually', 'contractor', 'contradiction', 'contrary', 'contributor', 'controversial', 'controversy', 'convenience', 'convention', 'conventional', 'conversion', 'convey', 'convict', 'conviction', 'convincing', 'cooperate', 'cooperative', 'coordinate', 'coordination', 'coordinator', 'copper', 'copyright', 'corporation', 'correction', 'correlate', 'correlation', 'correspond', 'correspondence', 'correspondent', 'corresponding', 'corridor', 'corrupt', 'corruption', 'costly', 'councillor', 'counselling', 'counsellor', 'counter', 'counterpart', 'countless', 'courtesy', 'coverage', 'crack', 'craft', 'crawl', 'creativity', 'creator', 'credibility', 'credible', 'creep', 'critically', 'critique', 'crown', 'crude', 'cruise', 'crush', 'crystal', 'cultivate', 'curiosity', 'curious', 'curriculum', 'custody', 'cutting', 'cynical', 'dairy', 'damaging', 'darkness', 'database', 'deadline', 'deadly', 'dealer', 'debris', 'debut', 'decision-making', 'decisive', 'declaration', 'dedicated', 'dedication', 'default', 'defect', 'defender', 'defensive', 'deficiency', 'deficit', 'delegate', 'delegation', 'delete', 'delicate', 'democracy', 'democratic', 'demon', 'demonstration', 'denial', 'denounce', 'dense', 'density', 'depart', 'dependence', 'dependent', 'depict', 'deploy', 'deployment', 'deposit', 'depression', 'deprive', 'deputy', 'derive', 'descend', 'descent', 'designate', 'desirable', 'desktop', 'desperately', 'destruction', 'destructive', 'detain', 'detection', 'detention', 'deteriorate', 'determination', 'devastate', 'devil', 'devise', 'devote', 'diagnose', 'diagnosis', 'dictate', 'dictator', 'differ', 'differentiate', 'dignity', 'dilemma', 'dimension', 'diminish', 'diplomat', 'diplomatic', 'directory', 'disability', 'disabled', 'disagreement', 'disappoint', 'disappointment', 'disastrous', 'discard', 'discharge', 'disclose', 'disclosure', 'discourage', 'discourse', 'discretion', 'discrimination', 'dismissal', 'disorder', 'displace', 'disposal', 'dispose', 'dispute', 'disrupt', 'disruption', 'dissolve', 'distant', 'distinct', 'distinction', 'distinctive', 'distinguish', 'distort', 'distract', 'distress', 'disturb', 'disturbing', 'diverse', 'diversity', 'divert', 'divine', 'divorce', 'doctrine', 'documentation', 'domain', 'dominance', 'dominant', 'donation', 'donor', 'downtown', 'drain', 'dramatically', 'drift', 'driving', 'drought', 'drown', 'duration', 'dynamic', 'eager', 'earnings', 'ecological', 'economics', 'economist', 'editorial', 'educator', 'effectiveness', 'efficiency', 'efficiently', 'elaborate', 'elbow', 'electoral', 'electronics', 'elegant', 'elementary', 'elevate', 'eligible', 'eliminate', 'elite', 'embark', 'embarrassment', 'embassy', 'embed', 'embody', 'embrace', 'emergence', 'emission', 'emotionally', 'empire', 'empirical', 'empower', 'enact', 'encompass', 'encouragement', 'encouraging', 'endeavour', 'endless', 'endorse', 'endorsement', 'endure', 'enforce', 'enforcement', 'engagement', 'engaging', 'enjoyable', 'enquire', 'enrich', 'enrol', 'ensue', 'enterprise', 'entertaining', 'enthusiast', 'entitle', 'entity', 'entrepreneur', 'envelope', 'epidemic', 'equality', 'equation', 'equip', 'equivalent', 'erect', 'erupt', 'escalate', 'essence', 'essentially', 'establishment', 'eternal', 'ethic', 'ethnic', 'evacuate', 'evaluation', 'evident', 'evoke', 'evolution', 'evolutionary', 'evolve', 'exaggerate', 'exceed', 'excellence', 'exception', 'exceptional', 'excess', 'excessive', 'exclude', 'exclusion', 'exclusive', 'exclusively', 'execute', 'execution', 'exert', 'exhibit', 'exile', 'exotic', 'expansion', 'expenditure', 'experimental', 'expertise', 'expire', 'explicit', 'explicitly', 'exploit', 'exploitation', 'explosive', 'exposure', 'extension', 'extensive', 'extensively', 'extract', 'extremist', 'fabric', 'fabulous', 'facilitate', 'faction', 'faculty', 'failed', 'fairness', 'fantasy', 'fatal', 'favourable', 'federal', 'feeding', 'feminist', 'fever', 'fibre', 'fierce', 'film-maker', 'filter', 'firearm', 'firefighter', 'firework', 'firmly', 'fixture', 'flavour', 'flawed', 'fleet', 'flesh', 'flexibility', 'flourish', 'fluid', 'footage', 'forbid', 'forecast', 'foreigner', 'forge', 'format', 'formation', 'formerly', 'formula', 'formulate', 'forth', 'forthcoming', 'fortunate', 'forum', 'fossil', 'foster', 'foundation', 'founder', 'fraction', 'fragile', 'fragment', 'framework', 'franchise', 'frankly', 'fraud', 'freely', 'frequent', 'frustrated', 'frustrating', 'frustration', 'fulfil', 'full-time', 'functional', 'fundamentally', 'fundraising', 'funeral', 'furious', 'gallon', 'gambling', 'gaming', 'gathering', 'gender', 'generic', 'genetic', 'genius', 'genocide', 'genuine', 'genuinely', 'gesture', 'glance', 'glimpse', 'globalization', 'globe', 'glorious', 'glory', 'golden', 'goodness', 'gorgeous', 'governance', 'governor', 'grace', 'graphic', 'graphics', 'grasp', 'grave', 'gravity', 'greatly', 'greenhouse', 'grief', 'grind', 'grocery', 'guerrilla', 'guidance', 'guideline', 'guilt', 'habitat', 'halfway', 'handful', 'handling', 'handy', 'harassment', 'harbour', 'hardware', 'harmony', 'harsh', 'harvest', 'hatred', 'haunt', 'hazard', 'headquarters', 'healthcare', 'heighten', 'helmet', 'hence', 'heritage', 'hidden', 'hierarchy', 'high-profile', 'highway', 'hilarious', 'historian', 'homeland', 'homeless', 'honesty', 'hopeful', 'hopefully', 'horizon', 'hostage', 'hostile', 'hostility', 'humanitarian', 'humanity', 'humble', 'hunger', 'hydrogen', 'hypothesis', 'identical', 'identification', 'ideological', 'ideology', 'idiot', 'ignorance', 'illusion', 'imagery', 'immense', 'immigration', 'imminent', 'immune', 'implement', 'implementation', 'implication', 'imprison', 'imprisonment', 'inability', 'inadequate', 'inappropriate', 'incentive', 'incidence', 'inclined', 'inclusion', 'incorporate', 'incorrect', 'incur', 'independence', 'index', 'indication', 'indicator', 'indictment', 'indigenous', 'induce', 'indulge', 'inequality', 'inevitable', 'infamous', 'infant', 'infect', 'infer', 'inflation', 'inflict', 'influential', 'infrastructure', 'inhabitant', 'inherent', 'inherit', 'inhibit', 'initiate', 'inject', 'injection', 'injustice', 'inmate', 'innovation', 'innovative', 'input', 'insert', 'insertion', 'insider', 'inspect', 'inspection', 'inspector', 'inspiration', 'installation', 'instant', 'instantly', 'instinct', 'institutional', 'instruct', 'instrumental', 'insufficient', 'insult', 'intact', 'intake', 'integral', 'integrate', 'integrated', 'integration', 'integrity', 'intellectual', 'intensify', 'intensity', 'intensive', 'intent', 'interact', 'interaction', 'interactive', 'interface', 'interfere', 'interference', 'interim', 'interior', 'intermediate', 'interpretation', 'interval', 'intervene', 'intervention', 'intimate', 'intriguing', 'invade', 'invasion', 'investigator', 'investor', 'invisible', 'invoke', 'involvement', 'ironic', 'ironically', 'irony', 'irrelevant', 'isolate', 'isolated', 'isolation', 'joint', 'journalism', 'judicial', 'junction', 'jurisdiction', 'justification', 'kidnap', 'kidney', 'kingdom', 'ladder', 'landing', 'landlord', 'landmark', 'large-scale', 'laser', 'lately', 'latter', 'lawsuit', 'layout', 'leaflet', 'legacy', 'legend', 'legendary', 'legislation', 'legislative', 'legislature', 'legitimate', 'lengthy', 'lesbian', 'lesser', 'lethal', 'liable', 'liberal', 'liberation', 'liberty', 'license', 'lifelong', 'lifetime', 'lighting', 'likelihood', 'likewise', 'limitation', 'line-up', 'linear', 'linger', 'listing', 'literacy', 'literally', 'literary', 'litre', 'litter', 'liver', 'lobby', 'logic', 'long-standing', 'long-time', 'lottery', 'loyal', 'loyalty', 'lyric', 'machinery', 'magical', 'magistrate', 'magnetic', 'magnificent', 'magnitude', 'mainland', 'mainstream', 'maintenance', 'major', 'make-up', 'making', 'mandate', 'mandatory', 'manifest', 'manipulate', 'manipulation', 'manufacture', 'manufacturing', 'manuscript', 'marathon', 'march', 'margin', 'marginal', 'marine', 'marker', 'marketplace', 'martial', 'massacre', 'mathematical', 'mature', 'maximize', 'mayor', 'meaningful', 'meantime', 'mechanic', 'mechanical', 'mechanism', 'medal', 'medication', 'medieval', 'meditation', 'melody', 'membership', 'memoir', 'memorable', 'memorial', 'mentor', 'merchant', 'mercy', 'merely', 'merge', 'merger', 'merit', 'metaphor', 'methodology', 'midst', 'migration', 'militant', 'militia', 'miner', 'minimal', 'minimize', 'mining', 'ministry', 'minute', 'miracle', 'miserable', 'misery', 'misleading', 'missile', 'mobility', 'mobilize', 'moderate', 'modest', 'modification', 'momentum', 'monopoly', 'monster', 'monthly', 'monument', 'morality', 'moreover', 'mortgage', 'mosque', 'motion', 'motivate', 'motivation', 'motive', 'motorist', 'moving', 'municipal', 'mutual', 'naked', 'namely', 'nasty', 'nationwide', 'naval', 'navigation', 'nearby', 'necessity', 'neglect', 'negotiate', 'negotiation', 'neighbouring', 'neutral', 'newly', 'newsletter', 'niche', 'noble', 'nominate', 'nomination', 'nominee', 'non-profit', 'nonetheless', 'nonsense', 'notable', 'notably', 'notebook', 'notify', 'notorious', 'novel', 'novelist', 'nowadays', 'nursery', 'nursing', 'nutrition', 'obesity', 'objection', 'oblige', 'observer', 'obsess', 'obsession', 'obstacle', 'occasional', 'occupation', 'occupy', 'occurrence', 'offender', 'offering', 'offspring', 'ongoing', 'openly', 'opera', 'operational', 'operator', 'optical', 'optimism', 'optimistic', 'orchestra', 'organic', 'organizational', 'orientation', 'originate', 'outbreak', 'outfit', 'outing', 'outlet', 'outlook', 'output', 'outrage', 'outsider', 'outstanding', 'overcome', 'overlook', 'overly', 'overnight', 'overseas', 'oversee', 'overturn', 'overwhelm', 'overwhelming', 'ownership', 'oxygen', 'packet', 'panic', 'parade', 'parallel', 'parameter', 'parental', 'parish', 'parliamentary', 'part-time', 'partial', 'partially', 'participation', 'partnership', 'passing', 'passionate', 'passive', 'password', 'pastor', 'patch', 'patent', 'pathway', 'patience', 'patrol', 'patron', 'pause', 'peasant', 'peculiar', 'penalty', 'perceive', 'perception', 'permanently', 'persist', 'persistent', 'personnel', 'petition', 'philosopher', 'philosophical', 'physician', 'pioneer', 'pipeline', 'pirate', 'placement', 'plead', 'pledge', 'plunge', 'portfolio', 'portion', 'portray', 'post-war', 'postpone', 'potentially', 'practitioner', 'preach', 'precede', 'precedent', 'precious', 'precise', 'precisely', 'precision', 'predator', 'predecessor', 'predictable', 'predominantly', 'preference', 'pregnancy', 'prejudice', 'preliminary', 'premier', 'premise', 'premium', 'prescribe', 'prescription', 'presently', 'preservation', 'preside', 'presidency', 'presidential', 'prestigious', 'presumably', 'presume', 'prevail', 'prevalence', 'prevention', 'pride', 'primarily', 'principal', 'prior', 'privatization', 'privilege', 'probability', 'probable', 'probe', 'problematic', 'proceed', 'proceeding', 'proceeds', 'processing', 'processor', 'proclaim', 'productive', 'productivity', 'profitable', 'profound', 'programming', 'progressive', 'prohibit', 'projection', 'prominent', 'promising', 'promotion', 'prompt', 'pronounced', 'propaganda', 'proportion', 'proposition', 'prosecute', 'prosecution', 'prosecutor', 'prospective', 'prosperity', 'protective', 'protein', 'protester', 'protocol', 'province', 'provincial', 'provision', 'provoke', 'psychiatric', 'psychological', 'publicity', 'publishing', 'pulse', 'punch', 'purely', 'pursuit', 'puzzle', 'query', 'quest', 'questionnaire', 'quota', 'racial', 'racism', 'racist', 'radar', 'radiation', 'radical', 'rally', 'random', 'ranking', 'rating', 'ratio', 'rational', 'readily', 'realization', 'realm', 'reasonably', 'reasoning', 'reassure', 'rebel', 'rebellion', 'rebuild', 'receiver', 'recession', 'recipient', 'reckon', 'recognition', 'reconstruction', 'recount', 'recovery', 'recruit', 'recruitment', 'referee', 'referendum', 'reflection', 'reform', 'refuge', 'refugee', 'refusal', 'regain', 'regardless', 'regime', 'registration', 'regulate', 'regulator', 'regulatory', 'rehabilitation', 'reign', 'reinforce', 'rejection', 'relevance', 'reliability', 'relieve', 'relieved', 'reluctant', 'remainder', 'remains', 'remarkable', 'remarkably', 'remedy', 'reminder', 'removal', 'render', 'renew', 'renowned', 'rental', 'replacement', 'reportedly', 'reporting', 'representation', 'reproduce', 'reproduction', 'republic', 'resemble', 'reside', 'residence', 'residential', 'residue', 'resign', 'resignation', 'resistance', 'resolution', 'respective', 'respectively', 'restoration', 'restore', 'restraint', 'restrict', 'restriction', 'resume', 'retail', 'retirement', 'retreat', 'retrieve', 'revelation', 'revenge', 'revenue', 'reverse', 'revision', 'revival', 'revive', 'revolutionary', 'rhetoric', 'ridiculous', 'rifle', 'risky', 'ritual', 'rival', 'robbery', 'robust', 'rocket', 'romance', 'rotate', 'rotation', 'roughly', 'ruling', 'rumour', 'sacred', 'sacrifice', 'saint', 'sanction', 'satisfaction', 'scandal', 'scare', 'scattered', 'scenario', 'sceptical', 'scholar', 'scholarship', 'scope', 'scratch', 'screening', 'screw', 'scrutiny', 'secular', 'seeker', 'seemingly', 'segment', 'seize', 'seldom', 'selective', 'seminar', 'senator', 'sensation', 'sensitivity', 'sentiment', 'separation', 'serial', 'set-up', 'settlement', 'settler', 'severely', 'sexuality', 'shaped', 'shareholder', 'shatter', 'sheer', 'shipping', 'shocking', 'shoot', 'shore', 'short-term', 'shortage', 'shortly', 'shrink', 'shrug', 'sibling', 'signature', 'significance', 'simulate', 'simulation', 'simultaneously', 'situated', 'sketch', 'skilled', 'skull', 'slash', 'slavery', 'slogan', 'smash', 'so-called', 'socialist', 'solely', 'solicitor', 'solidarity', 'somehow', 'sometime', 'sophisticated', 'sound', 'sovereignty', 'spare', 'spark', 'specialize', 'specialized', 'specification', 'specify', 'specimen', 'spectacle', 'spectacular', 'spectator', 'spectrum', 'speculate', 'speculation', 'spell', 'sphere', 'spill', 'spine', 'spite', 'spoil', 'spokesman', 'spokesperson', 'spokeswoman', 'sponsorship', 'sporting', 'spotlight', 'spouse', 'squad', 'squeeze', 'stability', 'stabilize', 'stake', 'stall', 'stance', 'standing', 'stark', 'starve', 'statistical', 'steadily', 'steam', 'steer', 'stereotype', 'stimulate', 'stimulus', 'storage', 'straightforward', 'strain', 'strand', 'strategic', 'strengthen', 'strictly', 'striking', 'strip', 'strive', 'stroke', 'structural', 'stumble', 'stunning', 'submission', 'subscriber', 'subscription', 'subsequent', 'subsequently', 'subsidy', 'substantial', 'substantially', 'substitute', 'substitution', 'subtle', 'suburb', 'suburban', 'succession', 'successive', 'successor', 'suffering', 'sufficient', 'sufficiently', 'suicide', 'suite', 'summit', 'super', 'superb', 'superior', 'supervise', 'supervision', 'supervisor', 'supplement', 'supportive', 'supposedly', 'suppress', 'supreme', 'surge', 'surgeon', 'surgical', 'surplus', 'surrender', 'surveillance', 'survival', 'survivor', 'suspend', 'suspension', 'suspicion', 'suspicious', 'sustain', 'sustainable', 'swallow', 'swing', 'sword', 'symbolic', 'sympathetic', 'syndrome', 'synthesis', 'systematic', 'tackle', 'tactic', 'tactical', 'taxpayer', 'technological', 'teens', 'temple', 'temporarily', 'tempt', 'tenant', 'tendency', 'tender', 'tension', 'tenure', 'terminal', 'terminate', 'terms', 'terrain', 'terribly', 'terrific', 'terrify', 'territory', 'terror', 'terrorism', 'terrorist', 'testify', 'testimony', 'testing', 'textbook', 'texture', 'thankfully', 'theatrical', 'theft', 'theology', 'theoretical', 'therapist', 'thereafter', 'thereby', 'thesis', 'thorough', 'thoroughly', 'thought-provoking', 'thoughtful', 'thread', 'threshold', 'thrilled', 'thrive', 'thumb', 'tighten', 'timber', 'timely', 'timing', 'tissue', 'tobacco', 'tolerance', 'tolerate', 'tonne', 'torture', 'total', 'tournament', 'toxic', 'trace', 'trademark', 'trading', 'tragedy', 'tragic', 'trail', 'trailer', 'trait', 'transaction', 'transcript', 'transformation', 'transit', 'transmission', 'transmit', 'transparency', 'transparent', 'transportation', 'trauma', 'treasure', 'treaty', 'tremendous', 'tribal', 'tribe', 'tribunal', 'tribute', 'trigger', 'trillion', 'triumph', 'troop', 'trophy', 'troubled', 'trustee', 'tsunami', 'tuition', 'turnout', 'turnover', 'twist', 'ultimate', 'unacceptable', 'uncertainty', 'undergo', 'undergraduate', 'underlying', 'undermine', 'undertake', 'undoubtedly', 'unfold', 'unfortunate', 'unify', 'unite', 'unity', 'universal', 'unprecedented', 'unveil', 'upcoming', 'upgrade', 'uphold', 'urgent', 'usage', 'useless', 'utility', 'utilize', 'utterly', 'vacuum', 'vague', 'valid', 'validity', 'vanish', 'variable', 'variation', 'varied', 'venture', 'verbal', 'verdict', 'verify', 'verse', 'versus', 'vertical', 'vessel', 'veteran', 'viable', 'vibrant', 'vicious', 'viewpoint', 'villager', 'violate', 'violation', 'virtue', 'visible', 'vocal', 'voluntary', 'voting', 'vulnerability', 'vulnerable', 'wander', 'warehouse', 'warfare', 'warming', 'warrant', 'warrior', 'weaken', 'weave', 'weekly', 'weird', 'welfare', 'well-being', 'whatsoever', 'wheat', 'whereby', 'whilst', 'whoever', 'wholly', 'widen', 'widespread', 'widow', 'width', 'willingness', 'wisdom', 'withdraw', 'withdrawal', 'workforce', 'workout', 'workplace', 'workshop', 'worship', 'worthwhile', 'worthy', 'wrist', 'yield', 'youngster'];

/*
 * change filename to random timestamp
 */
export function fakeFilename(file, type) {
  let newFilename = '';
  switch (type) {
    // 1704194250189220
    case 'unix': {
      newFilename = getRandomDate().getTime() + getRandomString(3, false, false, true);
      break;
    }
    // 0e9
    case 'kym': {
      newFilename = getRandomHexString(3);
      break;
    }
    // avy1rrzbk1ac1
    case 'reddit': {
      newFilename = getRandomString(13, true, false, true);
      break;
    }
    // IMG_0034
    case 'iphoneIMG': {
      newFilename = `IMG_${getRandomString(4, false, false, true)}`;
      break;
    }
    // 65643660-6BF5-4FAC-BCC8-5773B72514CE
    case 'iphoneGUID': {
      newFilename = crypto.randomUUID().toUpperCase();
      break;
    }
    // F4zVDbeWIAAq_Ni
    // GCyjf3KWMAAU_Qz
    case 'twitter': {
      const prefixes = [
        'F',
        'GC',
      ];
      const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];
      const randomString = getRandomString(15 - randomPrefix.length);

      newFilename = `${randomPrefix}${randomString}`;
      break;
    }
    // 124342389_145006067356037_6086706656468654784_n
    case 'facebook': {
      newFilename = `${getRandomString(9, false, false, true)}_${
        getRandomString(15, false, false, true)}_${
        getRandomString(19, false, false, true)}_n`;
      break;
    }
    // tumblr_47f73d3d8583ad12f660d2bab3998726_d6abe730_1280
    case 'tumblr': {
      newFilename = `tumblr_${getRandomHexString(32)}_${
        getRandomHexString(8)}_1280`;
      break;
    }
    // 41b34ed42ca4a5987f819cc5cc3cfd4f526dd9b64745107fa85d6156a7a30057_1
    case 'ifunny': {
      newFilename = `${getRandomHexString(64)}_1`;
      break;
    }
    // Insane+arrogant+confining_46dfc5_11201632
    // Astonishing+accountant+ample_a1e914_11201640
    // Casualties+of+retards_57caed_11191528
    case 'funnyjunk': {
      const randomWord = () => wordlist[Math.floor(Math.random() * wordlist.length)];

      let firstWord = randomWord();
      firstWord = firstWord.charAt(0).toUpperCase() + firstWord.substring(1);

      newFilename = `${firstWord}+${randomWord()}+${randomWord()}_${
        getRandomHexString(6)}_${
        getRandomString(8, false, false, true)}`;
      break;
    }
    // aREb42A_700b
    // a2K3wQw_700b
    case '9gag': {
      newFilename = `a${getRandomString(6)}_700b`;
      break;
    }
    // IMG-20230128-WA0000.jpg
    case 'whatsapp': {
      const date = getRandomDate();
      let month = date.getMonth() + 1;
      if (month < 10) {
        month = `0${month}`;
      }
      let day = date.getDate();
      if (day < 10) {
        day = `0${day}`;
      }
      newFilename = `IMG-${date.getFullYear()}${month}${day
      }-WA00${getRandomString(2, false, false, true)}`;
      break;
    }
    default: {
      newFilename = file.name;
      break;
    }
  }

  // attach extension
  newFilename += `.${file.name.split('.').slice(-1)}`;

  debugLog(`Changing the filename to "${newFilename}"`);
  return new File([file], newFilename, { type: file.type });
}

function changeRandomPixel(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      const img = new Image();
      img.onload = () => {
        debugLog('Changing random pixel of an image');

        const cvs = document.createElement('canvas');
        cvs.width = img.width;
        cvs.height = img.height;

        const ctx = cvs.getContext('2d');
        ctx.drawImage(img, 0, 0);

        const imageData = ctx.getImageData(0, 0, cvs.width, cvs.height);
        const data = imageData.data;

        // modify random pixel's red channel
        const pixelIndex = Math.floor(Math.random() * (data.length / 4)) * 4;
        data[pixelIndex] += 1;

        ctx.putImageData(imageData, 0, 0);

        cvs.toBlob((blob) => {
          const newFile = new File([blob], file.name, { type: file.type });
          resolve(newFile);
        }, file.type, 0.9);
      };

      img.src = reader.result;
    }, false);

    reader.readAsDataURL(file);
  });
}

/*
 * change image hash by changing random pixel or adding random bytes at the end
 */
export function anonHash(file) {
  return new Promise((resolve) => {
    if (file.type === 'image/jpeg' || file.type === 'image/png') {
      changeRandomPixel(file).then((newFile) => {
        resolve(newFile);
      });
      return;
    }

    const reader = new FileReader();
    reader.addEventListener('load', () => {
      debugLog('Adding random bytes to file');

      let fileBits = [];
      const randomSz = 8;
      const random = new Uint8Array(randomSz);
      crypto.getRandomValues(random);

      if (file.type === 'image/gif' || file.type === 'video/webm') {
        const offset = ((file.type === 'video/webm') ? reader.result.byteLength * 0.001 : 2);
        fileBits = [
          reader.result.slice(0, -offset - randomSz),
          random,
          reader.result.slice(-offset),
        ];
      } else {
        fileBits = [reader.result, random];
      }

      const newFile = new File(fileBits, file.name, { type: file.type });
      resolve(newFile);
    }, false);

    reader.readAsArrayBuffer(file);
  });
}

/*
 * convert webp into jpeg
 */
export function fileConvert(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      let mimetype = file.type;
      let filename = file.name;

      if (mimetype === 'image/webp') {
        debugLog('Converting WebP to JPEG');

        mimetype = 'image/jpeg';

        const lastDotIndex = filename.lastIndexOf('.');
        if (lastDotIndex !== -1) {
          filename = filename.substring(0, lastDotIndex);
        }

        filename += '.jpg';

        const img = new Image();
        img.onload = () => {
          const cvs = document.createElement('canvas');
          cvs.width = img.width;
          cvs.height = img.height;

          const ctx = cvs.getContext('2d');
          ctx.drawImage(img, 0, 0);

          cvs.toBlob((blob) => {
            const nFile = new File([blob], filename, { type: mimetype });
            resolve(nFile);
          }, mimetype, 0.9);
        };

        img.src = reader.result;
      } else {
        resolve(file);
      }
    }, false);

    reader.readAsDataURL(file);
  });
}

const subreddits = [
  'summonerschool', 'Design', 'harrypotter', 'AskOuija', 'Poetry', 'XboxSeriesX', 'lgbt', 'bayarea', 'indie', 'CrazyIdeas', 'AbandonedPorn', 'HighQualityGifs', 'intel', 'batman', 'gaming', 'nintendo', 'GreatBritishMemes', 'antiwork', 'vinyl', 'reddevils', 'woof_irl', 'facepalm', 'steak', 'Genshin_Impact', 'nostalgia', 'PraiseTheCameraMan', 'marvelmemes', 'vegetarian', 'hockey', 'realestateinvesting', 'kpop', 'DadReflexes', 'PerfectTiming', 'tifu', 'Stoicism', 'UrbanHell', 'anime', 'investing', 'MostBeautiful', 'SkincareAddicts', 'tippytaps', 'HistoryMemes', 'plotholes', 'LeopardsAteMyFace', 'MLS', 'Filmmakers', 'nvidia', 'writing', 'Fallout', 'Awwducational', 'carporn', 'options', 'hmm', 'DunderMifflin', 'Prematurecelebration', 'Weird', 'ConvenientCop', 'PokemonSwordAndShield', 'backpacking', 'BrandNewSentence', 'ContagiousLaughter', 'Graffiti', 'trippinthroughtime', 'GamePhysics', 'corgi', 'BitcoinBeginners', 'productivity', 'WhyWereTheyFilming', 'DesignMyRoom', 'Moviesinthemaking', 'holdmyjuicebox', 'AITAH', 'pokemongo', 'dogs', 'selfimprovement', 'whatsthisbug', 'NintendoSwitch', 'wow', 'VALORANT', 'rarepuppers', 'algotrading', 'dankchristianmemes', 'javascript', 'mangaswap', 'netflix', 'nottheonion', 'cats', 'thatHappened', 'japan', 'learnart', 'manganews', 'WorkReform', 'TwoSentenceHorror', 'RetroFuturism', 'Kanye', 'spotify', 'KerbalSpaceProgram', 'rapbattles', 'antimeme', 'doodles', 'motorcycles', 'Outdoors', 'Repaintings', 'NoMansSkyTheGame', 'photoshopbattles', 'technicallythetruth', 'GifRecipes', 'InteriorDesign', 'ofcoursethatsathing', 'cookingforbeginners', 'Ghosts', 'warriors', 'Bundesliga', 'tipofmytongue', 'jobs', 'IAmA', 'buildapc', 'keto', 'playstation', 'MadeMeSmile', 'MedievalCats', 'shittyrobots', 'technews', 'ThingsCutInHalfPorn', 'lostredditors', 'beauty', 'tech', 'brooklynninenine', 'wholesomememes', 'Hair', 'tennis', 'programming', 'Guitar', 'childfree', 'medicalschool', 'StrangerThings', 'Baking', 'Amd', 'Art', 'budgetfood', 'homestead', 'offbeat', 'Cinemagraphs', 'EarthPorn', 'StoppedWorking', 'Fauxmoi', 'FellowKids', 'FunnyAnimals', 'mlb', 'recruitinghell', 'TheSimpsons', 'Cooking', 'everymanshouldknow', 'indiameme', 'worldcup', 'Shoestring', 'Meditation', 'beyondthebump', 'maybemaybemaybe', 'cybersecurity', 'DataHoarder', 'MonsterHunter', 'gifs', 'Teachers', 'apolloapp', 'vagabond', 'youngpeopleyoutube', 'dontdeadopeninside', 'hiphop101', 'AskOldPeople', 'OpenAI', '100yearsago', 'wallpaper', 'lego', 'HunterXHunter', 'BadMUAs', 'CryptoMarkets', 'IndoorGarden', 'chromeos', 'creepypasta', 'AskReddit', 'forbiddensnacks', 'Illustration', 'BikiniBottomTwitter', 'Bitcoin', 'listentothis', 'wallstreetbets', 'natureismetal', 'Conservative', 'introvert', 'thesims', 'personalfinance', 'foodhacks', 'Coronavirus', 'OnePiece', 'thalassophobia', 'startups', 'ThatLookedExpensive', 'offmychest', 'funnyvideos', 'MarvelStudiosSpoilers', 'howto', 'StockMarket', 'news', 'ramen', 'landscaping', 'thewalkingdead', 'PoliticalHumor', 'MakeupAddiction', 'crochet', 'WeWantPlates', 'gadgets', 'DeepIntoYouTube', 'femalefashionadvice', 'Health', 'LofiHipHop', 'homegym', 'pcgaming', 'SCP', 'poland', 'memes', 'AccidentalRenaissance', 'Perfectfit', 'drawing', 'fantasyfootball', 'SipsTea', 'PUBATTLEGROUNDS', 'Turkey', 'soccer', 'popculturechat', 'drunkencookery', 'hearthstone', 'CasualConversation', '15minutefood', 'nutrition', 'Jokes', 'delhi', 'engrish', 'HealthyFood', 'DesignPorn', 'electronicmusic', 'TheWayWeWere', 'ClashRoyale', 'math', 'NotMyJob', 'catfaceplant', 'gameofthrones', 'sweden', 'mildlyinteresting', 'wholesomegifs', 'languagelearning', 'Frugal', 'WritingPrompts', 'wiiu', 'MovieSuggestions', 'entertainment', 'suggestmeabook', 'PetiteFashionAdvice', 'KitchenConfidential', 'NFT', 'nba', 'psychology', 'notliketheothergirls', 'Entrepreneur', 'outside', 'ExpectationVsReality', 'TalesFromYourServer', 'theydidthemath', 'legaladvice', 'talesfromtechsupport', 'IRLEasterEggs', 'manhwa', 'bodybuilding', 'ImTheMainCharacter', 'bjj', 'FantasyPL', 'gamedev', 'Starfield', 'techsupport', 'shortscarystories', 'Zoomies', 'learnpython', 'bonehurtingjuice', 'lotr', 'curlyhair', 'Pizza', 'surrealmemes', 'atheism', 'Showerthoughts', 'ArtPorn', 'BollyBlindsNGossip', 'AskEngineers', 'pathofexile', 'specializedtools', 'aww', 'Anticonsumption', 'relationship_advice', 'Cheap_Meals', 'AskCulinary', 'dataisbeautiful', 'fragrance', 'Fantasy', 'podcasts', 'casualiama', 'MinecraftMemes', 'creepy', 'movies', 'iphone', 'onejob', 'FreeEBOOKS', 'AmongUs', 'PokemonGoFriends', 'askscience', 'minimalism', 'battlestations', 'ProgrammerHumor', 'TheYouShow', 'learntodraw', 'Pareidolia', 'space', 'AskElectronics', 'homelab', 'marketing', 'BokuNoHeroAcademia', 'financialindependence', 'Paranormal', 'Coffee', 'MapPorn', 'BBQ', 'compsci', 'formula1', 'btc', 'ethtrader', 'FoodPorn', 'bodyweightfitness', 'RedditLaqueristas', 'bicycling', 'youtubehaiku', 'amv', 'ClashOfClans', 'Fishing', 'loseit', 'PunPatrol', 'iamverysmart', 'comics', 'scifi', 'Nails', 'bestof', 'blessedimages', 'easyrecipes', 'DotA2', 'dogswithjobs', 'gravityfalls', 'unpopularopinion', 'AteTheOnion', 'minipainting', 'nevertellmetheodds', 'distantsocializing', 'ADHD', 'comedyhomicide', 'MUAontheCheap', 'dogpictures', 'puns', 'london', 'ChatGPT', 'TrueOffMyChest', 'WhatsWrongWithYourCat', 'NeutralPolitics', 'comicbooks', 'AskEurope', 'Steam', 'disney', 'ufc', 'HobbyDrama', 'futurama', 'dating', 'history', 'WeAreTheMusicMakers', 'SkincareAddiction', 'GetMotivated', 'snowboarding', 'astrology', 'perfectlycutscreams', 'Hulu', 'television', 'MaliciousCompliance', 'chemicalreactiongifs', 'AskScienceFiction', 'germany', 'startrek', 'getdisciplined', 'AskHistorians', 'horror', 'BetterEveryLoop', 'TheSilphRoad', 'IllegallySmolCats', 'PS5', 'bollywood', 'DigitalArt', 'photography', 'AccidentalCamouflage', 'mildlysatisfying', 'WhyWomenLiveLonger', 'AskHR', 'Autos', 'somethingimade', 'gardening', 'travel', 'pokemontrades', 'Astronomy', 'cosplayprops', 'BeautyGuruChatter', 'hometheater', 'graphic_design', 'tooktoomuch', 'BestofRedditorUpdates', 'MyPeopleNeedMe', 'MealPrepSunday', 'DIY', 'timelapse', 'PoliticalDiscussion', 'headphones', 'Watches', 'AnimeART', 'HaircareScience', 'weirddalle', 'perfectloops', 'BeAmazed', 'EscapefromTarkov', 'HomeImprovement', 'AnimalsOnReddit', 'midjourney', 'lifehacks', 'gamernews', 'ethereum', 'apexlegends', 'tf2', 'AnimeFunny', 'IWantToLearn', 'bangtan', 'mashups', 'GetStudying', 'Minecraft', 'Dogtraining', 'science', 'AnimeMusicVideos', 'PokemonScarletViolet', 'WitchesVsPatriarchy', 'FrugalFemaleFashion', 'MMA', 'sewing', 'LegalAdviceUK', 'findapath', 'funnysigns', 'formuladank', 'Hololive', 'blender', 'HumansAreMetal', 'thisismylifenow', 'philosophy', 'HomeDecorating', 'LearnUselessTalents', 'gifsthatkeepongiving', 'AnimalsBeingJerks', 'NASCAR', 'cardano', 'CFB', 'MachinePorn', 'rpg', '2007scape', 'Tools', 'ArchitecturePorn', 'thenetherlands', 'boardgames', 'SpecArt', 'MechanicAdvice', 'melbourne', 'Brawlstars', 'CatsOnKeyboards', 'thanosdidnothingwrong', 'PropagandaPosters', 'ireland', 'photocritique', 'nyc', 'TattooDesigns', 'halo', 'CrappyDesign', 'resumes', 'roblox', 'awwwtf', 'CollegeBasketball', 'Patriots', 'Disneyland', 'LeagueOfMemes', 'labrats', 'Justrolledintotheshop', 'rap', 'GameDeals', 'Breadit', 'LearnJapanese',

  '4chan', 'pepethefrog', 'me_irl', '196', 'ihaveihaveihavereddit',
  // https://en.wikipedia.org/wiki/Controversial_Reddit_communities
  'Jailbait', 'beatingwomen', 'beatingwomen2', 'Braincels', 'Incels', 'ChapoTrapHouse', 'Coontown', 'Chodi', 'ChongLangTV', 'CLTV', 'CreepShots', 'CringeAnarchy', 'cringe', 'DarkNetMarkets', 'European', 'europe', 'The_Donald', 'Mr_Trump', 'FatPeopleHate', 'hamplanethatred', 'neofag', 'transfags', 'FindBostonBombers', 'frenworld', 'Honkler', 'GasTheKikes', 'KikeTown', 'GenderCritical', 'Jakolandia', 'MGTOW', 'MillionDollarExtreme', 'BillionShekelSupreme', 'milliondollarextreme2', 'ChadRight', 'NoNewNormal', 'rejectnewnormal', 'refusenewnormal', 'PandemicHoax', 'truthseekers', 'vaxxhappened', 'Physical_Removal', 'pizzagate', 'CBTS_stream', 'GreatAwakening', 'BiblicalQ', 'Quincels', 'The_GreatAwakening', 'SanctionedSuicide', 'SonyGOP', 'Shoplifting', 'TheFappening', 'TruFemcels', 'TumblrInAction', 'SocialJusticeInAction', 'UncensoredNews', 'WatchPeopleDie', 'Gore', 'WPDTalk', 'workreform', 'aznidentity', 'AsianMasculinity', 'BlackPeopleTwitter', 'FemaleDatingStrategy', 'AgainstHateSubreddits', 'GenZedong', 'HermanCainAward', 'KotakuInAction', 'OffMyChest', 'NaturalHair', 'Rape', 'MensRights', 'NoFap', 'piracy', 'PiratedGames', 'Portugueses', 'Russia', 'RussiaPolitics', 'Technology', 'TheRedPill', 'WhitePeopleTwitter', 'picsofdeadkids', 'ChapoTrapHouset', 'Reddit', 'TheoryOfReddit', 'conspiracy',
  // nsfw
  'nsfw', 'nsfw2', 'TipOfMyPenis', 'bonermaterial', 'nsfw411', 'iWantToFuckHer', 'exxxtras', 'distension', 'bimbofetish', 'christiangirls', 'dirtygaming', 'sexybutnotporn', 'femalepov', 'omgbeckylookathiscock', 'sexygirls', 'breedingmaterial', 'canthold', 'toocuteforporn', 'justhotwomen', 'stripgirls', 'hotstuffnsfw', 'uncommonposes', 'gifsofremoval', 'nostalgiafapping', 'truefmk', 'nudes', 'milf', 'gonewild30plus', 'preggoporn', 'realmoms', 'agedbeauty', 'legalteens', 'collegesluts', 'adorableporn', 'legalteensXXX', 'gonewild18', '18_19', 'just18', 'PornStarletHQ', 'fauxbait', 'realgirls', 'amateur', 'homemadexxx', 'dirtypenpals', 'FestivalSluts', 'CollegeAmateurs', 'amateurcumsluts', 'nsfw_amateurs', 'funwithfriends', 'randomsexiness', 'amateurporn', 'normalnudes', 'ItsAmateurHour', 'irlgirls', 'verifiedamateurs', 'Camwhores', 'camsluts', 'streamersgonewild', 'GoneWild', 'PetiteGoneWild', 'gonewildstories', 'GoneWildTube', 'treesgonewild', 'gonewildaudio', 'GWNerdy', 'gonemild', 'altgonewild', 'gifsgonewild', 'analgw', 'gonewildsmiles', 'onstageGW', 'RepressedGoneWild', 'bdsmgw', 'UnderwearGW', 'LabiaGW', 'TributeMe', 'WeddingsGoneWild', 'gwpublic', 'assholegonewild', 'leggingsgonewild', 'dykesgonewild', 'goneerotic', 'snapchatgw', 'gonewildhairy', 'gonewildtrans', 'gonwild', 'ratemynudebody', 'onmww', 'GWCouples', 'gonewildcouples', 'gwcumsluts', 'WouldYouFuckMyWife', 'couplesgonewild', 'gonewildcurvy', 'GoneWildplus', 'BigBoobsGW', 'bigboobsgonewild', 'mycleavage', 'gonewildchubby', 'AsiansGoneWild', 'gonewildcolor', 'indiansgonewild', 'latinasgw', 'pawgtastic', 'workgonewild', 'GoneWildScrubs', 'swingersgw', 'militarygonewild', 'NSFW_Snapchat', 'snapchat_sluts', 'snapleaks', 'wifesharing', 'hotwife', 'wouldyoufuckmywife', 'slutwife', 'rule34', 'ecchi', 'futanari', 'doujinshi', 'yiff', 'furry', 'monstergirl', 'rule34_comics', 'sex_comics', 'hentai', 'hentai_gif', 'WesternHentai', 'hentai_irl', 'overwatch_porn', 'pokeporn', 'bowsette', 'rule34lol', 'rule34overwatch', 'BDSM', 'Bondage', 'BDSMcommunity', 'femdom', 'blowjobs', 'lipsthatgrip', 'deepthroat', 'onherknees', 'blowjobsandwich', 'iwanttosuckcock', 'Body Parts', 'ass', 'asstastic', 'facedownassup', 'assinthong', 'bigasses', 'buttplug', 'TheUnderbun', 'booty', 'pawg', 'paag', 'cutelittlebutts', 'hipcleavage', 'frogbutt', 'HungryButts', 'cottontails', 'lovetowatchyouleave', 'celebritybutts', 'cosplaybutts', 'whooties', 'anal', 'painal', 'masterofanal', 'buttsharpies', 'asshole', 'AssholeBehindThong', 'spreadem', 'girlsinyogapants', 'yogapants', 'boobies', 'TittyDrop', 'boltedontits', 'boobbounce', 'boobs', 'downblouse', 'homegrowntits', 'cleavage', 'breastenvy', 'youtubetitties', 'torpedotits', 'thehangingboobs', 'page3glamour', 'fortyfivefiftyfive', 'tits', 'amazingtits', 'BustyPetite', 'hugeboobs', 'stacked', 'burstingout', '2busty2hide', 'bigtiddygothgf', 'engorgedveinybreasts', 'bigtitsinbikinis', 'pokies', 'ghostnipples', 'nipples', 'puffies', 'lactation', 'tinytits', 'aa_cups', 'titfuck', 'clothedtitfuck', 'braceface', 'GirlswithNeonHair', 'shorthairchicks', 'blonde', 'stockings', 'legs', 'tightshorts', 'buttsandbarefeet', 'feet', 'datgap', 'thighhighs', 'thickthighs', 'thighdeology', 'pussy', 'rearpussy', 'innie', 'simps', 'pelfie', 'godpussy', 'presenting', 'cameltoe', 'hairypussy', 'pantiestotheside', 'breakingtheseal', 'moundofvenus', 'pussymound', 'Hotchickswithtattoos', 'sexyfrex', 'tanlines', 'oilporn', 'ComplexionExcellence', 'SexyTummies', 'theratio', 'bodyperfection', 'samespecies', 'athleticgirls', 'coltish', 'curvy', 'gonewildplus', 'thick', 'juicyasians', 'voluptuous', 'biggerthanyouthought', 'jigglefuck', 'chubby', 'SlimThick', 'massivetitsnass', 'thicker', 'tightsqueeze', 'casualjiggles', 'bbw', 'fitgirls', 'fitnakedgirls', 'dirtysmall', 'petitegonewild', 'xsmallgirls', 'funsized', 'hugedicktinychick', 'petite', 'skinnytail', 'volleyballgirls', 'Ohlympics', 'celebnsfw', 'WatchItForThePlot', 'nsfwcelebarchive', 'celebritypussy', 'oldschoolcoolNSFW', 'extramile', 'jerkofftocelebs', 'onoffcelebs', 'celebswithbigtits', 'youtubersgonewild', 'cumsluts', 'GirlsFinishingTheJob', 'cumfetish', 'cumcoveredfucking', 'cumhaters', 'thickloads', 'before_after_cumsluts', 'pulsatingcumshots', 'impressedbycum', 'creampies', 'throatpies', 'FacialFun', 'cumonclothes', 'oralcreampie', 'creampie', 'HappyEmbarrassedGirls', 'unashamed', 'borednignored', 'annoyedtobenude', 'damngoodinterracial', 'AsianHotties', 'realasians', 'AsianNSFW', 'nextdoorasians', 'asianporn', 'bustyasians', 'IndianBabes', 'NSFW_Japan', 'javdownloadcenter', 'kpopfap', 'NSFW_Korea', 'WomenOfColor', 'darkangels', 'blackchickswhitedicks', 'ebony', 'Afrodisiac', 'ginger', 'redheads', 'latinas', 'latinacuties', 'palegirls', 'snowwhites', 'NSFW_GIF', 'nsfw_gifs', 'porn_gifs', 'porninfifteenseconds', 'CuteModeSlutMode', '60fpsporn', 'NSFW_HTML5', 'the_best_nsfw_gifs', 'verticalgifs', 'besthqporngifs', 'twingirls', 'groupofnudegirls', 'Ifyouhadtopickone', 'nsfwhardcore', 'SheLikesItRough', 'strugglefucking', 'whenitgoesin', 'outercourse', 'gangbang', 'pegging', 'insertions', 'passionx', 'xsome', 'cuckold', 'cuckquean', 'breeding', 'forcedcreampie', 'amateurgirlsbigcocks', 'facesitting', 'nsfw_plowcam', 'pronebone', 'facefuck', 'girlswhoride', 'highresNSFW', 'incestporn', 'wincest', 'incest_gifs', 'Individuals', 'remylacroix', 'Anjelica_Ebbi', 'BlancNoir', 'rileyreid', 'tessafowler', 'lilyivy', 'mycherrycrush', 'gillianbarnes', 'emilybloom', 'miamalkova', 'sashagrey', 'angelawhite', 'miakhalifa', 'alexapearl', 'missalice_18', 'lanarhoades', 'evalovia', 'GiannaMichaels', 'erinashford', 'sextrophies', 'sabrina_nichole', 'LiyaSilver', 'MelissaDebling', 'AdrianaChechik', 'sarah_xxx', 'dollywinks', 'funsizedasian', 'Kawaiiikitten', 'legendarylootz', 'sexyflowerwater', 'keriberry_420', 'justpeachyy', 'hopelesssofrantic', 'lesbians', 'StraightGirlsPlaying', 'girlskissing', 'mmgirls', 'holdthemoan', 'O_faces', 'jilling', 'gettingherselfoff', 'quiver', 'GirlsHumpingThings', 'forcedorgasms', 'ruinedorgasms', 'realahegao', 'suctiondildos', 'baddragon', 'squirting', 'ladybonersgw', 'massivecock', 'chickflixxx', 'gaybrosgonewild', 'sissies', 'penis', 'monsterdicks', 'freeuse', 'fuckdoll', 'degradingholes', 'fuckmeat', 'OnOff', 'nsfwoutfits', 'girlswithglasses', 'collared', 'seethru', 'sweatermeat', 'cfnm', 'nsfwfashion', 'leotards', 'whyevenwearanything', 'shinyporn', 'bikinis', 'bikinibridge', 'nsfwcosplay', 'nsfwcostumes', 'girlsinschooluniforms', 'WtSSTaDaMiT', 'tightdresses', 'upskirt', 'Bottomless_Vixens', 'tight_shorts', 'lingerie', 'porn', 'suicidegirls', 'GirlsDoPorn', 'pornstarhq', 'porninaminute', 'ChangingRooms', 'FlashingGirls', 'publicflashing', 'sexinfrontofothers', 'NotSafeForNature', 'realpublicnudity', 'socialmediasluts', 'flashingandflaunting', 'publicsexporn', 'nakedadventures', 'trashyboners', 'flubtrash', 'realsexyselfies', 'nude_selfie', 'Tgirls', 'traps', 'tgifs', 'shemales', 'femboys', 'transporn', 'pornvids', 'nsfw_videos', 'dirtysnapchat', 'randomactsofblowjob', 'NSFWFunny', 'pornhubcomments', 'confusedboners', 'dirtykikpals', 'nsfw_wtf', 'randomactsofmuffdive', 'stupidslutsclub', 'sluttyconfessions', 'jobuds', 'drunkdrunkenporn', 'popping', 'medicalgore',
];

const usernames = ['RedditJoeys', 'Arama', 'DarkJokesMods', 'jerryeight', 'BaphometsDaughter', 'PoorlyTimedPhraseGuy', 'CornCobMcGee', 'hjalmar111', 'azzazaz', 'Midwork1', 'auriem', 'fuckHg', 'canipaybycheck', 'READMYSHIT', 'Smight', 'sighburg', 'Naughtiestdingo', 'AdamE89', 'TypicalWindow', 'mrpo-ruff', 'carlinha1289', 'Diazepam', 'THTIME', 'simgasm', 'lesboautisticweeabo', 'beanieb', 'Mr_Abe_Froman', 'redwall_hp', 'ManlyJowe', 'QueenFimbrethil', 'SomethingIWontRegret', 'techiesbesthero', 'Derf_Jagged', 'AndyWarwheels', 'RamblingOkie', 'Sandy_brothman', 'Spysix', 'Xiosphere', 'lolcats69', 'throwawayscientist2', 'Goal1', 'jasperzieboon', 'BeigeListed', 'ProEviIOperations', 'Mister_Jay_Peg', 'NO_TOUCHING__lol', 'n_reineke', 'cantcer', 'Jarl_Chick_Nugs', 'Adewotta', '_BindersFullOfWomen_', 'lordtuts', 'Trauermarsch', 'kreius', 'fireballbren', 'IAmTheShitRedditSays', 'phd_dude', 'lietuvis10LTU', 'LevTheRed', 'The_Fluffy_Walrus', 'FlippedTurtles', 'NSYK', 'RicoVig', 'webdoodle', 'bluefoot55', 'NLC40', 'atz_97', 'Zeydon', 'optimalg', 'Niflhe', 'Voidjumper_ZA', 'Bossman1086', 'StashYourCashews', 'Isentrope', 'thederpyeyes', 'TheOfficialDoubleSwe', 'long_wang_big_balls', 'Daniel15', 'Mgrth111', 'DubTeeDub', 'NDoilworker', 'AwardSpeechEdits', 'pepperouchau', 'Jenn_There_Done_That', 'BigJ76', 'mrnotloc', 'iSucksAtJavaScript', 'agamemn0n1', 'greeniethemoose', 'JouleS88', 'TheNewPoetLawyerette', 'immapeeinurass', 'anupthehipster', 'FallenAngelChaos', 'ohhwerd', 'Atomos128', 'mattiejj', 'irJustineee', 'LoveOfProfit', 'NTRX', 'A_Giant_Egg', 'TheSentinel_0', 'jlw_01', 'SeeThroughCanoe', 'SabroToothTiger', 'DancingHeel', 'GamationOnReddit', 'PoppinKREAM', 'beersndrums', 'Aelegans', 'Mr-Nebraska', 'ZadocPaet', 'xHOCKEYx12', 'mar10wright', 'Instagram', 'zepel', 'VilePug', 'Solthercunt', 'MrTempestilence', 'xmetalhead2000', 'Toolatelostcause', 'maybesaydie', 'Pharoside', 'visvis', 'siccoblue', 'hamolton', 'Clarkey7163', 'LuigiVargasLlosa', 'nickcavedoll', 'Ryulightorb', 'stopscopiesme', 'ConfusedByPans', 'JamiecoTECHNO', 'malicious_turtle', 'blksith0', 'aqouta', 'Sepulchxr', 'ROOTlN', 'actionbastard89', 'greets_you_as_Dennis', 'FortniteLegendD', 'Tornado9797', 'agreeablehitler', 'morr1025', 'NDoilworker', 'chjacobsen', 'xerodeth', '0chiii', 'ahbslldud', 'SaraByAccident', 'smokay83', 'DBCrumpets', 'AdamE89', 'noisyturtle', 'koraedo', 'pewkiemuffinboo', 'Prak903', 'Dustin-', 'blazefalcon', 'hiddentofu', 'shadowkiller168', 'DeadPrez', 'Brainzman', 'Elderthedog', 'IronProdigyOfficial', 'awkward_the_turtle', 'sloth_on_meth', 'fajardo99', 'UltimateProSkilz', 'Pinksister', 'Fletch71011', 'Seizing_sponge', 'DonQuixoteReference', 'SolarAquarion', 'eulogy_for_an_ology', 'tanzaniteflame', 'Proteon', 'lsentrope', 'skullknap', 'Growlitherapy', 'Power0fGamersO1', 'RickeyB', '0x_', 'wrc-wolf', 'Mega_Toast', 'Lol33ta', 'AntonioOfVenice', 'Xanatos903', 'JiveMonkey', 'Krogglidor', 'MostRadicalCentrist', 'O-shi', 'bigbowlowrong', 'dingofarmer2004', 'ContentWithOurDecay', 'sodypop', 'cwenham', 'acidrain666', 'TheSonar', 'riggity', 'Bancas', 'GummyBearGrylls', 'ArseBiscuits', 'snallygaster', 'Rad_Centrist_Mod', 'abe702', 'ArianaGrandesDonuts', 'BFKelleher', 'mrtommy', 'jhaun_shit', 'goblinhog', 'SpartacusThomas', 'brerkmgher', 'genderchangers', 'Erledigaeth', 'kodark', 'SkinnyShroomOfDeath', 'Smgth', 'Coffeechipmunk', 'LandGridArray', 'Allupertti', 'CitizenPremier', 'loomynartylenny', 'TheSentinel_15', 'Swimmingturtle247', 'Hooman2004', 'TheSpiritedGamer', 'EpitaFelis', 'OneRedSent', 'stealingyourpixels', 'GooeyChickenman', 'SirWalterPoodleman', 'AlbertIInstein', 'wtec', 'castdex', 'Deity_Of_Death', 'this_time_i_mean_it', 'zayap18', 'aphilosopherofmen', 'caferreri11', 'shakypears', 'beernerd', 'strokethekitty', 'pussgurka', 'kingphysics', 'NYPD-32', 'RandomExcess', 'Kesha_Paul', 'tehsma', 'PenguinSweetDreamer', 'thegeneralx', 'vikinick', 'LiterallyKesha', 'yocandygirl011195', 'mynameismunka', 'OBLIVIATER', 'WeaponsGradeHumanity', 'command3r_ISA', 'RabidTurtl', 'BR123456', 'fitzichael', 'greensunset', 'bazite', 'NullOfUndefined', 'The_Bhuda_Palm', 'Zachums', 'syo', 'mycatdoesmytaxes', 'Hilltopchill', 'jumbods64', 'G3m', 'GetOffMyLawn_', 'I_FART_OUT_MY_BUTT69', 'Feyle', 'WearyTunes', 'sooth_', 'IAmJacksBallOfHate', 'metrix', 'Thefivenines', 'IDontHaveAnAgenda', 'Can_The_SRDine', 'LeonDanksky', 'Rights_Advocate', 'AnthropomorphizedHat', 'noeatnosleep', 'i_like_turtles_1969', 'BornAgainNewsTroll', 'steelpan', 'I_love_Hopslam', 'senctrad', 'Kateraide', 'Keithiscool97', 'SeasOfTrees', 'LivingSaladDays', 'piyushsharma301', 'aedeos', 'cuddles_the_destroye', 'Im12AMA', 'Nomsfud', 'Flair_Helper', 'SixCatsInAnAlley', 'Nechaev', 'HiFructoseCornFeces', 'frankreddit5', 'imtn', 'potverdorie', 'pawsitivelypowerful', 'CrewsCrew', 'Heliozoan', 'xenokilla', 'Pol_Pots_Crockpot', 'DoctorRoosterMD', 'Dumbsbob_Tpants', 'HarrietPotter', 'MZ603', 'StrategicSarcasm', 'Tornado9797', 'PotatoMusicBinge', 'Subtle_Omega', 'DominusLutrae', 'ThatAstronautGuy', 'TheGroovyTurt1e', 'Coltrane23', 'Instant_Regret_mods', 'Thedaveabides98', 'johnharveykellogg', 'gossippetition', 'Shylo132', 'bitterred', 'boboyboxer', 'YhCHKN', 'Tod_Gottes', 'VIOLENT_POOP', 'diogenesjunior', 'misnamed', 'steveofftheinternet', 'CedarWolf', 'TheRedditPope', 'ImaginaryMod', 'ELFAHBEHT_SOOP', 'TheThirdStrike', 'redagfdgafd', 'chabuddy95', 'kwwxis', '30-xv', 'TheAurumGamer', 'k_princess', 'Series_of_Accidents', 'Emmx2039', 'CoachVega', 'RemoveNull', 'fizzypickles', 'CrankyLollopop', 'go1dfish', 'whatwildoes', 'TheRighteousTyrant', 'justcool393', 'ScarletShield', 'Scumbag__', 'thefryn', 'Keypaw', 'collapse_turtle', 'KittyKat1986', 'KINKY_RD', 'x_MyDude_x', 'DylanJonesey', 'Zapparoth', 'thebest77777', 'DanielTaylor', 'CowOrMonkey', 'Sanlear', 'BelleAriel', 'iDovke', '3nip5you', 'Thumperings', 'iNeverQuiteWas', 'NYLaw', 'pfohl', 'F_1_R_E', 'typhoid-fever', 'greensign', 'Ralph-Hinkley', 'carrots084', 'JackSucksAtTheKazoo', 'PotatoMusicBinge', 'volstedgridban', 'QuiteQ', 'jesuspunk', '_-Metatr0n-_', 'SuperTurtle', 'morebeansplease', 'calexil', 'APOPTO5I5', 'awkward_the_turtle', 'EnlightenedCentrist9', 'thirdegree', 'Minervaxcel', 'juliangray', 'GanjaGooBalls', 'LordeVinyl', 'QualityVote', 'THHBBB', 'AerateMark', 'madd74', 'the_r_gamemaster', 'TheSentinel_5', 'General_Insomnia', 'rsocfan', 'stoppage_time', 'LowSociety', 'Bornhuetter', 'MonikaForever', 'marsianer', 'PM_ME_MOD_INVITES', 'montblanc25', 'WhyThisJorgal', 'LordOfTheTorts', 'J4k0b42', 'LenaOxton01', 'hectorlizard', 'James007BondUK', 'kboy101222', 'krispykrackers', 'bossness555', 'kt_m_smith', 'AnnoyingCharacterLim', 'Quietuus', 'ggg730', 'DasBeardius', 'kmankx2', 'random-person-001', 'RJBlarmo', 'bytester', 'LANDLORD__MESSIAH', 'babar77', 'gangnam_style', 'Dlight98', 'bodom2245', 'AnSq', 'SirLotsaLocks', 'Atvelonis', 'thesonnysideup', 'Sunkisty', 'Myrandall', 'AnotherClosetAtheist', 'Lord__Hippo', 'Truegold43', 'Babypenis69', 'ReBurnInator', 'nodnarb232001', 'mycatiswatchingyou', 'soupyhands', 'NeedAGoodUsername', 'alottacrumbs', 'ArchangelleN8theGr8', 'DaylightDarkle', 'bobcobble2', 'ihaveallthelions', 'IronedSandwich', '18aidanme', 'dukesinbad', 'LickMyUrchin', 'Vince-Trousers', 'cahaseler', 'floozbag54', 'eyjafjallajoekull', 'IWitherman', '5o7', 'blau_wie_das_meer', 'DrShillgood', 'NorseFenrir', 'kgb_operative', 'stuffed02', 'Mooseman06', 'Tagesausbruch', 'TheMamaGary', 'fortune_cell', 'ucantsimee', 'Tiis-', 'Bodence', 'axle_steele', 'heaf517', 'celebsannounce', 'hwhouston517', 'tresser', 'MissCherryPi', 'meat_tunnel', 'CannedWolfMeat', 'ActuallyDavid_', 'Vusys', 'CartoonWarp', 'ramune17', 'lady-linux', 'SelfAwareMolecules', 'lolsail', 'Low_Town', 'dmoneyyyyy', 'lgf92', 'JustAnotherSimian', 'another-thing', 'WellHePaidForDinner', 'neophytetradclimber', 'Beboprockss', 'dicemaze', 'me131211', 'Boredguy58', 'SixIsNotANumber', 'ImNotReallyJesus', 'zangpakto', 'Lysis10', 'Caramel_Macchiato_32', 'stevenfrijoles', 'SampleName1337', 'ulubulu', 'BAN_VIDEO_GAMES_NOW', 'stopspammingme', 'Pharmakarmer', 'o_higgy', 'Belledame-sans-Serif', 'Butthole__Pleasures', 'Six6Sicks', 'Nate337', 'FlameItsMe', 'SamGamesPro', 'Fiery1Phoenix', 'GubmintStooge', 'spacehogg', 'Diastro', 'Warlizard', 'Galactic', 'jiandersonzer0', 'smikims', 'boi_thats_my_yeet', 'WorseThanHipster', 'Stockso', 'linkprovidor', 'watchyourparkinmeter', 'nuclearmeltdown2015', 'Zotfripper', 'fuzzy_winkerbean', 'b12ftw', 'Clerisme', 'dustinyo', 'Whack-aTroll', 'elcielo17', 'Mynameisnotdoug', 'helium_farts', 'xxLurker', 'emmster', 'ConnorK500', 'officer_panda159', 'Jayfeather69', 'michael7050', 'asde', 'King_of_the_Butt', 'AlveolarPressure', 'graslej', 'Reddisaurusrekts', 'Riock', 'UncleSamuel', 'dovercliff', 'Schiffy94', 'reynad_NaCl', 'imjustheretodomyjob', 'BigMurph26', 'joejoejoey', 'Googunk', 'Surly_Badger', 'Dave-The-Joker', 'TheSentinel_16', 'Villezki', 'emobatmanforever', 'CaptainChildLover', 'awesomesprime', 'SethRichOrDieTryin', 'thelazymd-mod', '-I-__am__Gallowboob', 'King_Abdul', 'OMGWTFBBQUE', 'the3sense', 'hollybooty', 'WiFilip', 'juancarias', 'Phallindrome', 'SpezForgotSwartz', 'TheGrandDalaiKarma', 'real_nice_guy', 'cerberus6320', 'fireflycities', 'VariousThoughts', 'IwataFan', 'jaggazz_V2', 'FreeComplimentsMod', 'DJ_Chaps', 'SupremoZanne', 'ahampster', 'amishredditor', 'HandicapperGeneral', 'MockDeath', 'jsmorley', 'TAKEitTOrCIRCLEJERK', 'IamUnique2035', 'originalucifer', '_tomGER', 'Nom_Chompy', 'mikepool1986', 'MattRyd7', 'fruitjerky', 'NovaSF', 'elpinko', 'x_minus_one', 'snoopfroggydog', 'radiozip', 'too_many_toasters', 'DocMcBrown', 'TehBamski', 'MotherHolle', 'thebular', '-Antiheld-', 'breadnukleus', 'goldninjaI', 'Reddit-User-3000', 'Splinxyy', 'erktheerk', 'Hope1995x', 'kikedank', 'Warneral', 'stinkylibrary', 'MugaSofer', 'cah578', 'agentlame', 'Neutrahl', 'Acidtwist', 'vxx', 'pomosexuality', 'dan__wizard', 'marc1309', 'CaptainBZarre', 'ForceBlade', 'Jackson1442', '4775795f4d616e', 'Ohmm', 'Sobsz', 'thatwentBTE', 'Novadestin', 'Too_MuchWhiskey', 'Pr2r', 'IronGemini', 'TheBroCodeEnforcer', 'tejmar', 'kellysama', 'familynight', 'shotpun', 'TopMind0fReddit', 'TotesMesseger', 'clobster5', 'brendanblack', 'Altrissa', 'DestinyCE', 'just-a-traveler', 'absurdlyobfuscated', 'WolfHaleyGolfWang', 'greenduch', 'wizarduss', 'PowerOfGamers01', 'Depraved_Turtle', 'Troll__LaLa_LaLa', 'petiterunner', 'FightFromTheInside', 'Trajan_', 'Sir_Meowstro', 'SlimJones123', 'splashboom123', 'RubyCodpiece', 'I_Am_Batgirl', 'jimbozak', 'BrokeCFO', 'Wtfisthatkid', 'K_Lobstah', 'sgtapples69', 'ityoclys', 'pwaves13', 'baconaro', 'hackensak', 'yours_duly', 'Walcott_Brooks', 'iKrazy', 'roastedbagel', 'joshimax', 'NinetoFiveHeroRises', 'Umbresp', 'Pewdsgamers', 'ZadocPaet', 'AkivaAvraham', 'JCSandt', 'Sephr', 'IrbyTumor', 'conalfisher', 'A_Cylon_Raider', 'blackbrandt', 'King-of-the-Snekes', 'MufflerMoose', 'Rated', 'Stuttero', 'futiliteur', 'taggerungkid', 'skizfrenik_syco', 'torncolours', 'uknjs', 'TreKs', 'Not_An_Ambulance', 'Hielexx_00', 'FrenchMotherFucker', 'BeansOnPostMalone', 'c64person', 'Mrsparklee', 'Multimoon', 'cheezerme', 'cantCme', 'Here_Comes_The_King', 'CarvarX', 'gnujack', 'redditMEred', 'Pushigoh', 'AmericanJBert', 'explohd', 'The--Lion', 'Deeked', 'Samoht99', 'elephantofdoom', 'Tsblloveyou', 'Endless_Vanity', 'Fandol', 'VindtUMijTeLang', 'JerryfromTomandJerry', 'd4rkph03n1x', 'Jonahoa', 'watercolorstain90', 'G4L4CT1C4', 'V1RtU4LxM3N4C3', 'imnoidiot', 'TheRevengeOfBob', 'reddithasaproblem', 'WillHasStyles', 'aonome', 'Romney_for_President', 'DualNeedlers', 'SmellsLikeMarbles', 'dustinyo_', 'abe703', 'innuendoPL', 'TJ_Schoost', 'FurryPornAccount', 'westcoastcdn19', 'NYLaw', 'A_Mouse_In_Da_House', 'trashlikeyourmom', 'Skyllz89', 'IndigoSoln', 'fedbuddy', 'Klaxun', 'MisterWoodhouse', 'pascal_prv', 'jhc1415', 'TylerFromCanada', 'Rhamni', 'Lightning_Farron', 'Avenger_of_Justice', 'fillhumpfree', 'Arkontas', 'lordsleepyhead', 'Zibabbidibow', 'JellyTornado', 'DavidLuizshair', 'caesar15', 'vlepun', 'SmileyFace-_-', 'Windex007', 'undergroundaleroad', 'indianawalsh', 'm0rris0n_hotel', 'malz_', 'Tenebra99', 'BusToNutley', 'must_warn_others', 'EightRoundsRapid', 'gentellotus', 'wzard', 'Cherry_Star_Cream', 'PmButtPics4ADrawing', 'dramasutra2020', 'smarvin6689', 'Zwemvest', 'HaikuberryFin', 'Minn-ee-sottaa', 'Feanorfanclub', 'sunbolts', 'Poppwall', 'persona_dos', 'Shy__RedheadV2', 'Computer_Name', 'NameBran', 'cwenham', 'WYLD_STALLYNS', 'DangKilla', 'morr1025', 'Jaraxo', 'B_Underscore', 'wisemcgee', 'awkwardtheparrot', 'BigMadGrape', 'hoosakiwi', 'themeatbridge', 'quelar', 'RetroBitTechnology', 'HAHApointsatyou', 'BeingNetwork', 'PapaKnowsDominoes', 'Duke_Paul', 'boogsley', 'Qbek-san', 'Isentrope', 'MikeyTheDinosaur', 'Cullly', 'FixinThePlanet', 'AFJ', 'leftabitcharlie', 'EquivalentSelf', 'Gentle_Catsine', 'Nasjere', 'Zaebos_11', 'organic_crystal_meth', 'duckduckCROW', 'GhostOfBearBryant', 'sodypoop', 'kingeryck', 'freewillbird', 'SoulFire6464', 'CelestialWalrus', 'Thatonetf2player', 'Shredder13', 'therealdanhill', 'JoyousCacophony', 'Dr_Mrs_TheM0narch', 'Swanksterino', '1Voice1Life', 'Norskiing', 'bakonydraco', 'The_ABC', 'sidshembekar', 'SuspiciousHistorian', 'dickfromaccounting', 'I_Regret_Everything', 'TIP_ME_COINS', 'laurtw', 'mjg13X', 'Sarahthelizard', 'SandwichIllustrious', 'GuidoZ', 'Booyahhayoob', 'AGreatWind', 'GuacamoleFanatic', 'mudkipz321', 'devtimi', 'KrustyKoonKrackers', 'iammrpositive', 'twentyone_21', 'Hooman_Super', 'NoMoreGoodNamesLeft', 'OG_gaiming01', 'fdf2002', 'M0D3RNW4RR10R', 'TheUnamedPotato', 'PM_ME_YOUR_FUZZTONE', 'Quietus42', 'bethlookner', 'smokinjoints', 'S_Jeru', 'femroot', 'just-here4the_memes', 'hellbilly479', 'Obama_Brigade', 'AryanShiro', 'barkingtortoise', 'ComedicSans', 'TuskenCam', 'GUIpsp', 'Arfmeow', 'xerodeth', 'hippz', 'tercerero', 'howdy_yall_im_billy', 'nstinson', 'CornCobMcGee', 'Cherry_Star_Cream', 'ToastIncCeo', 'theLAZYmd', '-HoosierBob-', 'Lady_Plague', 'TheWolfRevenge', 'qzapmlwxonskjdhdnejj', 'rhllor', 'budmourad', 'BallsHard', 'commonvanilla', 'alottacrumbs', 'sourcreamjunkie', 'aaronp613', 'catalyst518', 'lanks1', 'zapff', 'JonAce', 'ethanw12gd', 'CJ105', 'Chemical__', 'BiddyCavit', 'badmonkey0001', 'cistercianmonk', 'TheSentinel_18', 'RazgrizS57', 'Pirate_Redbeard', 'Kate_6_President', 'stopscopiesme', 'idio3', 'PapaNachos', 'gogorami', 'Sarge_Ward', 'Regis_Sterling', 'CalifornianBall', 'Endless_Vanity', 'ItsNotDrew', 'liltrixxy', 'not_your_pal', 'CharizardLvl100', 'zombieslayerzak', 'glider97', 'ricarroni', 'morduhcai', 'Zyiarius', 'EmmaHS', 'deckpumps_n_deldos', 'raspberrykraken', 'Alabaster_Sugarfoot', 'MrsDrZoidberg', 'Werner__Herzog', 'itsmyotherface', 'spookydaniel', 'jartwobs', 'TheSentinel_14', 'ipaqmaster', 'tornato7', 'Timbo_KZ', 'broccolibadass', 'Forthewolfx', 'IAmNotYourBoss', 'ctwtn', 'timelapse00', 'kwwxis', 'lingrush', 'fozzybau5', 'KSSLR', 'loves_being_that_guy', 'GeluNumber1', 'TheCaringAsshole', 'mungoflago', 'Noerdy', 'hercs247', 'YesChancellor', 'Baldemoto', 'the3sense', 'EvTheSmev', 'chezygo', 'nt337', 'trakmiro', 'crabbix', 'borez', 'sublimeinslime', 'Ie_reddit', 'NewbornMuse', 'Keijeman', 'silverboyp', 'KoleAF', 'GoodguyGrjoni', 'chadridesabike', 'wsgy111', 'Trump_Sim', 'supcaci', 'Memekip', 'lars-on-somnia', 'VodkaBarf', '1210saad', 'Zagorath', 'Gaget', 'dakta', 'Nerkson', 'SolidCake', 'SuperEnd123', 'Vailhem', 'jokes_on_you', 'twinned'];

function drawWatermarkReddit(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      if (file.type === 'image/jpeg' || file.type === 'image/png') {
        const img = new Image();
        img.onload = () => {
          if (img.width < 200 || img.height < 200) {
            resolve();
            return;
          }

          let watermarkH = img.height * 0.054;

          if (watermarkH < 30) {
            watermarkH = 30;
          }

          if ((img.height + watermarkH) > 10000) {
            resolve();
            return;
          }

          const fontLight = new FontFace(
            'SF Compact Display',
            `url(${browser.runtime.getURL('/fonts/SF-Compact-Display-Light.otf')})`,
            {
              weight: '300',
            },
          );

          const fontMedium = new FontFace(
            'SF Compact Display',
            `url(${browser.runtime.getURL('/fonts/SF-Compact-Display-Medium.otf')})`,
            {
              weight: '500',
            },
          );

          document.fonts.add(fontLight);
          document.fonts.add(fontMedium);

          fontLight.load();
          fontMedium.load();

          document.fonts.ready.then(() => {
            debugLog('Adding Reddit watermark');

            const cvs = document.createElement('canvas');
            cvs.width = img.width;
            cvs.height = img.height + watermarkH;

            const ctx = cvs.getContext('2d');
            ctx.drawImage(img, 0, 0);

            ctx.fillStyle = 'rgb(40, 39, 42)';
            ctx.fillRect(0, img.height, img.width, watermarkH);

            const sidePadding = img.width * 0.02;
            let textX = sidePadding;
            const barMid = img.height + watermarkH / 2;

            const logoH = watermarkH * 0.58;
            const logoW = (logoH * 200) / 65; // maintain the aspect ratio

            const logoX = img.width - logoW - sidePadding;
            const logoY = barMid - logoH / 2;

            const fontName = 'SF Compact Display';
            let fontSize = Math.round(watermarkH * 0.34);
            let font = `${fontSize}px '${fontName}'`;

            ctx.fillStyle = 'white';
            ctx.textBaseline = 'middle';
            ctx.font = `300 ${font}`;

            const subreddit = subreddits[Math.floor(Math.random() * subreddits.length)];
            const username = usernames[Math.floor(Math.random() * usernames.length)];

            const textW = ctx.measureText(`Posted in r/${subreddit} by u/${username}`).width;
            const totalW = textW + sidePadding + img.width * 0.2;
            if (logoX < totalW) {
              fontSize = Math.round(fontSize * (logoX / totalW));
              font = `${fontSize}px '${fontName}'`;
              ctx.font = `300 ${font}`;
            }

            const postedIn = 'Posted in r/';
            ctx.fillText(postedIn, textX, barMid);
            textX += ctx.measureText(postedIn).width;

            ctx.font = `500 ${font}`;
            ctx.fillText(subreddit, textX, barMid);
            textX += ctx.measureText(subreddit).width;

            ctx.font = `300 ${font}`;
            const by = ' by u/';
            ctx.fillText(by, textX, barMid);
            textX += ctx.measureText(by).width;

            ctx.font = `500 ${font}`;
            ctx.fillText(username, textX, barMid);

            const logo = new Image();
            logo.onload = () => {
              ctx.drawImage(logo, logoX, logoY, logoW, logoH);

              cvs.toBlob((blob) => {
                const newFile = new File([blob], file.name, { type: file.type });
                resolve(newFile);
              }, file.type, 0.9);
            };

            logo.src = browser.runtime.getURL('/icons/reddit.png');
          });
        };

        img.src = reader.result;
      } else {
        resolve();
      }
    }, false);

    reader.readAsDataURL(file);
  });
}

function drawWatermarkIfunny(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      if (file.type === 'image/jpeg' || file.type === 'image/png') {
        const img = new Image();
        img.onload = () => {
          if (img.width < 200 || img.height < 200) {
            resolve();
            return;
          }

          const watermarkH = 20;

          if ((img.height + watermarkH) > 10000) {
            resolve();
            return;
          }

          debugLog('Adding iFunny watermark');

          const cvs = document.createElement('canvas');
          cvs.width = img.width;
          cvs.height = img.height + watermarkH;

          const ctx = cvs.getContext('2d');
          ctx.drawImage(img, 0, 0);

          ctx.fillStyle = 'rgb(23, 23, 25)';
          ctx.fillRect(0, img.height, img.width, watermarkH);

          const logoX = img.width - 135;
          const logoY = img.height;

          const logo = new Image();
          logo.onload = () => {
            ctx.drawImage(logo, logoX, logoY);
            cvs.toBlob((blob) => {
              const newFile = new File([blob], file.name, { type: file.type });
              resolve(newFile);
            }, file.type, 0.9);
          };

          logo.src = browser.runtime.getURL('icons/ifunny.png');
        };

        img.src = reader.result;
      } else {
        resolve();
      }
    }, false);

    reader.readAsDataURL(file);
  });
}

export function drawWatermark(file, type) {
  if (type === 'reddit') {
    return drawWatermarkReddit(file);
  } if (type === 'ifunny') {
    return drawWatermarkIfunny(file);
  }
  return file;
}

/*
 * check if file is within filesize limit, recompress into jpg if not.
 * if jpeg is still too large, reduce it's compression level till it fits
 */
export function fileCompress(file, maxImageSize, compressionLevel) {
  return new Promise((resolve) => {
    if (file.size < maxImageSize) {
      if (compressionLevel) {
        const qrError = document.getElementById('qrError');
        if (qrError && qrError.getAttribute('data-type') === 'filesize') {
          qrError.style.display = 'none';
        }
        debugLog(`Successfully compressed the image, new file size - ${file.size} bytes`);
      }
      resolve(file);
      return;
    }

    if (file.type !== 'image/png' && file.type !== 'image/jpeg' && file.type !== 'image/webp') {
      resolve(file);
      return;
    }

    let filename = file.name;
    const mimetype = 'image/jpeg';

    if (!compressionLevel) {
      compressionLevel = 0.9;
      const lastDotIndex = filename.lastIndexOf('.');
      if (lastDotIndex !== -1) {
        filename = filename.substring(0, lastDotIndex);
      }

      filename += '.jpg';
    } else {
      compressionLevel -= (0.9 / 3);
      if (compressionLevel < 0) {
        debugLog("Can't compress further");
        resolve(file);
        return;
      }
    }
    debugLog(`Compressing the image to JPEG quality ${compressionLevel.toFixed(2)}`);

    const reader = new FileReader();
    reader.addEventListener('load', () => {
      const img = new Image();
      img.onload = () => {
        const cvs = document.createElement('canvas');
        cvs.width = img.width;
        cvs.height = img.height;

        const ctx = cvs.getContext('2d');
        ctx.drawImage(img, 0, 0);

        cvs.toBlob((blob) => {
          const nFile = new File([blob], filename, { type: mimetype });
          fileCompress(nFile, maxImageSize, compressionLevel).then((newFile) => resolve(newFile));
        }, mimetype, compressionLevel);
      };

      img.src = reader.result;
    }, false);

    reader.readAsDataURL(file);
  });
}
