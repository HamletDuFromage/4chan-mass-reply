import {
  debugLog,
  getRandomDate,
} from './misc';

import {
  changeModificationTime,
} from './png';

/*
 * change filename to random timestamp
 */
export function anonFilename(file) {
  const randomTimestamp = getRandomDate().getTime();
  const filename = `${randomTimestamp}.${file.name.split('.').slice(-1)}`;
  debugLog(`Changing the filename to "${filename}"`);
  return new File([file], filename, { type: file.type });
}

/*
 * change image hash by adding random bytes at the end or changing png time chunk
 */
export function anonHash(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      debugLog('Changing the file hash');

      let newFile = [];
      if (file.type === 'image/png') {
        newFile = changeModificationTime(reader.result);
      } else {
        const randomSz = 8;
        const random = new Uint8Array(randomSz);
        crypto.getRandomValues(random);

        if ((file.type === 'image/jpeg') || (file.type === 'image/gif')) {
          newFile = [
            reader.result.slice(0, -2 - randomSz),
            random,
            reader.result.slice(-2),
          ];
        } else if (file.type === 'video/webm') {
          const offset = reader.result.byteLength * 0.001;

          newFile = [
            reader.result.slice(0, -offset - randomSz),
            random,
            reader.result.slice(-offset),
          ];
        } else {
          newFile = [reader.result, random];
        }
      }

      const nFile = new File(newFile, file.name, { type: file.type });
      resolve(nFile);
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
          cvs.width = img.naturalWidth;
          cvs.height = img.naturalHeight;

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
  'Jailbait', 'beatingwomen', 'beatingwomen2', 'Braincels', 'Incels', 'ChapoTrapHouse', 'Coontown', 'Chodi', 'ChongLangTV', 'CLTV', 'CreepShots', 'CringeAnarchy', 'cringe', 'DarkNetMarkets', 'European', 'europe', 'The_Donald', 'Mr_Trump', 'FatPeopleHate', 'hamplanethatred', 'neofag', 'transfags', 'FindBostonBombers', 'frenworld', 'Honkler', 'GasTheKikes', 'KikeTown', 'GenderCritical', 'Jakolandia', 'MGTOW', 'MillionDollarExtreme', 'BillionShekelSupreme', 'milliondollarextreme2', 'ChadRight', 'NoNewNormal', 'rejectnewnormal', 'refusenewnormal', 'PandemicHoax', 'truthseekers', 'vaxxhappened', 'Physical_Removal', 'pizzagate', 'CBTS_stream', 'GreatAwakening', 'BiblicalQ', 'Quincels', 'The_GreatAwakening', 'SanctionedSuicide', 'SonyGOP', 'Shoplifting', 'TheFappening', 'TruFemcels', 'TumblrInAction', 'SocialJusticeInAction', 'UncensoredNews', 'WatchPeopleDie', 'Gore', 'WPDTalk', 'workreform', 'aznidentity', 'AsianMasculinity', 'BlackPeopleTwitter', 'FemaleDatingStrategy', 'AgainstHateSubreddits', 'GenZedong', 'HermanCainAward', 'KotakuInAction', 'OffMyChest', 'NaturalHair', 'Rape', 'MensRights', 'NoFap', 'piracy', 'PiratedGames', 'Portugueses', 'Russia', 'RussiaPolitics', 'Technology', 'TheRedPill', 'WhitePeopleTwitter', 'picsofdeadkids', 'The', 'reddit', 'announcements', 'ChapoTrapHouset', 'Reddit', 'TheoryOfReddit', 'conspiracy',
  // nsfw
  'nsfw', 'nsfw2', 'TipOfMyPenis', 'bonermaterial', 'nsfw411', 'iWantToFuckHer', 'exxxtras', 'distension', 'bimbofetish', 'christiangirls', 'dirtygaming', 'sexybutnotporn', 'femalepov', 'omgbeckylookathiscock', 'sexygirls', 'breedingmaterial', 'canthold', 'toocuteforporn', 'justhotwomen', 'stripgirls', 'hotstuffnsfw', 'uncommonposes', 'gifsofremoval', 'nostalgiafapping', 'truefmk', 'nudes', 'milf', 'gonewild30plus', 'preggoporn', 'realmoms', 'agedbeauty', 'legalteens', 'collegesluts', 'adorableporn', 'legalteensXXX', 'gonewild18', '18_19', 'just18', 'PornStarletHQ', 'fauxbait', 'realgirls', 'amateur', 'homemadexxx', 'dirtypenpals', 'FestivalSluts', 'CollegeAmateurs', 'amateurcumsluts', 'nsfw_amateurs', 'funwithfriends', 'randomsexiness', 'amateurporn', 'normalnudes', 'ItsAmateurHour', 'irlgirls', 'verifiedamateurs', 'Camwhores', 'camsluts', 'streamersgonewild', 'GoneWild', 'PetiteGoneWild', 'gonewildstories', 'GoneWildTube', 'treesgonewild', 'gonewildaudio', 'GWNerdy', 'gonemild', 'altgonewild', 'gifsgonewild', 'analgw', 'gonewildsmiles', 'onstageGW', 'RepressedGoneWild', 'bdsmgw', 'UnderwearGW', 'LabiaGW', 'TributeMe', 'WeddingsGoneWild', 'gwpublic', 'assholegonewild', 'leggingsgonewild', 'dykesgonewild', 'goneerotic', 'snapchatgw', 'gonewildhairy', 'gonewildtrans', 'gonwild', 'ratemynudebody', 'onmww', 'GWCouples', 'gonewildcouples', 'gwcumsluts', 'WouldYouFuckMyWife', 'couplesgonewild', 'gonewildcurvy', 'GoneWildplus', 'BigBoobsGW', 'bigboobsgonewild', 'mycleavage', 'gonewildchubby', 'AsiansGoneWild', 'gonewildcolor', 'indiansgonewild', 'latinasgw', 'pawgtastic', 'workgonewild', 'GoneWildScrubs', 'swingersgw', 'militarygonewild', 'NSFW_Snapchat', 'snapchat_sluts', 'snapleaks', 'wifesharing', 'hotwife', 'wouldyoufuckmywife', 'slutwife', 'rule34', 'ecchi', 'futanari', 'doujinshi', 'yiff', 'furry', 'monstergirl', 'rule34_comics', 'sex_comics', 'hentai', 'hentai_gif', 'WesternHentai', 'hentai_irl', 'overwatch_porn', 'pokeporn', 'bowsette', 'rule34lol', 'rule34overwatch', 'BDSM', 'Bondage', 'BDSMcommunity', 'femdom', 'blowjobs', 'lipsthatgrip', 'deepthroat', 'onherknees', 'blowjobsandwich', 'iwanttosuckcock', 'Body Parts', 'ass', 'asstastic', 'facedownassup', 'assinthong', 'bigasses', 'buttplug', 'TheUnderbun', 'booty', 'pawg', 'paag', 'cutelittlebutts', 'hipcleavage', 'frogbutt', 'HungryButts', 'cottontails', 'lovetowatchyouleave', 'celebritybutts', 'cosplaybutts', 'whooties', 'anal', 'painal', 'masterofanal', 'buttsharpies', 'asshole', 'AssholeBehindThong', 'spreadem', 'girlsinyogapants', 'yogapants', 'boobies', 'TittyDrop', 'boltedontits', 'boobbounce', 'boobs', 'downblouse', 'homegrowntits', 'cleavage', 'breastenvy', 'youtubetitties', 'torpedotits', 'thehangingboobs', 'page3glamour', 'fortyfivefiftyfive', 'tits', 'amazingtits', 'BustyPetite', 'hugeboobs', 'stacked', 'burstingout', '2busty2hide', 'bigtiddygothgf', 'engorgedveinybreasts', 'bigtitsinbikinis', 'pokies', 'ghostnipples', 'nipples', 'puffies', 'lactation', 'tinytits', 'aa_cups', 'titfuck', 'clothedtitfuck', 'braceface', 'GirlswithNeonHair', 'shorthairchicks', 'blonde', 'stockings', 'legs', 'tightshorts', 'buttsandbarefeet', 'feet', 'datgap', 'thighhighs', 'thickthighs', 'thighdeology', 'pussy', 'rearpussy', 'innie', 'simps', 'pelfie', 'godpussy', 'presenting', 'cameltoe', 'hairypussy', 'pantiestotheside', 'breakingtheseal', 'moundofvenus', 'pussymound', 'Hotchickswithtattoos', 'sexyfrex', 'tanlines', 'oilporn', 'ComplexionExcellence', 'SexyTummies', 'theratio', 'bodyperfection', 'samespecies', 'athleticgirls', 'coltish', 'curvy', 'gonewildplus', 'thick', 'juicyasians', 'voluptuous', 'biggerthanyouthought', 'jigglefuck', 'chubby', 'SlimThick', 'massivetitsnass', 'thicker', 'tightsqueeze', 'casualjiggles', 'bbw', 'fitgirls', 'fitnakedgirls', 'dirtysmall', 'petitegonewild', 'xsmallgirls', 'funsized', 'hugedicktinychick', 'petite', 'skinnytail', 'volleyballgirls', 'Ohlympics', 'celebnsfw', 'WatchItForThePlot', 'nsfwcelebarchive', 'celebritypussy', 'oldschoolcoolNSFW', 'extramile', 'jerkofftocelebs', 'onoffcelebs', 'celebswithbigtits', 'youtubersgonewild', 'cumsluts', 'GirlsFinishingTheJob', 'cumfetish', 'cumcoveredfucking', 'cumhaters', 'thickloads', 'before_after_cumsluts', 'pulsatingcumshots', 'impressedbycum', 'creampies', 'throatpies', 'FacialFun', 'cumonclothes', 'oralcreampie', 'creampie', 'HappyEmbarrassedGirls', 'unashamed', 'borednignored', 'annoyedtobenude', 'damngoodinterracial', 'AsianHotties', 'realasians', 'AsianNSFW', 'nextdoorasians', 'asianporn', 'bustyasians', 'IndianBabes', 'NSFW_Japan', 'javdownloadcenter', 'kpopfap', 'NSFW_Korea', 'WomenOfColor', 'darkangels', 'blackchickswhitedicks', 'ebony', 'Afrodisiac', 'ginger', 'redheads', 'latinas', 'latinacuties', 'palegirls', 'snowwhites', 'NSFW_GIF', 'nsfw_gifs', 'porn_gifs', 'porninfifteenseconds', 'CuteModeSlutMode', '60fpsporn', 'NSFW_HTML5', 'the_best_nsfw_gifs', 'verticalgifs', 'besthqporngifs', 'twingirls', 'groupofnudegirls', 'Ifyouhadtopickone', 'nsfwhardcore', 'SheLikesItRough', 'strugglefucking', 'whenitgoesin', 'outercourse', 'gangbang', 'pegging', 'insertions', 'passionx', 'xsome', 'cuckold', 'cuckquean', 'breeding', 'forcedcreampie', 'amateurgirlsbigcocks', 'facesitting', 'nsfw_plowcam', 'pronebone', 'facefuck', 'girlswhoride', 'highresNSFW', 'incestporn', 'wincest', 'incest_gifs', 'Individuals', 'remylacroix', 'Anjelica_Ebbi', 'BlancNoir', 'rileyreid', 'tessafowler', 'lilyivy', 'mycherrycrush', 'gillianbarnes', 'emilybloom', 'miamalkova', 'sashagrey', 'angelawhite', 'miakhalifa', 'alexapearl', 'missalice_18', 'lanarhoades', 'evalovia', 'GiannaMichaels', 'erinashford', 'sextrophies', 'sabrina_nichole', 'LiyaSilver', 'MelissaDebling', 'AdrianaChechik', 'sarah_xxx', 'dollywinks', 'funsizedasian', 'Kawaiiikitten', 'legendarylootz', 'sexyflowerwater', 'keriberry_420', 'justpeachyy', 'hopelesssofrantic', 'lesbians', 'StraightGirlsPlaying', 'girlskissing', 'mmgirls', 'holdthemoan', 'O_faces', 'jilling', 'gettingherselfoff', 'quiver', 'GirlsHumpingThings', 'forcedorgasms', 'ruinedorgasms', 'realahegao', 'suctiondildos', 'baddragon', 'squirting', 'ladybonersgw', 'massivecock', 'chickflixxx', 'gaybrosgonewild', 'sissies', 'penis', 'monsterdicks', 'freeuse', 'fuckdoll', 'degradingholes', 'fuckmeat', 'OnOff', 'nsfwoutfits', 'girlswithglasses', 'collared', 'seethru', 'sweatermeat', 'cfnm', 'nsfwfashion', 'leotards', 'whyevenwearanything', 'shinyporn', 'bikinis', 'bikinibridge', 'nsfwcosplay', 'nsfwcostumes', 'girlsinschooluniforms', 'WtSSTaDaMiT', 'tightdresses', 'upskirt', 'Bottomless_Vixens', 'tight_shorts', 'lingerie', 'porn', 'suicidegirls', 'GirlsDoPorn', 'pornstarhq', 'porninaminute', 'ChangingRooms', 'FlashingGirls', 'publicflashing', 'sexinfrontofothers', 'NotSafeForNature', 'realpublicnudity', 'socialmediasluts', 'flashingandflaunting', 'publicsexporn', 'nakedadventures', 'trashyboners', 'flubtrash', 'realsexyselfies', 'nude_selfie', 'Tgirls', 'traps', 'tgifs', 'shemales', 'femboys', 'transporn', 'pornvids', 'nsfw_videos', 'dirtysnapchat', 'randomactsofblowjob', 'NSFWFunny', 'pornhubcomments', 'confusedboners', 'dirtykikpals', 'nsfw_wtf', 'randomactsofmuffdive', 'stupidslutsclub', 'sluttyconfessions', 'jobuds', 'drunkdrunkenporn', 'popping', 'medicalgore',
];

const usernames = ['RedditJoeys', 'Arama', 'DarkJokesMods', 'jerryeight', 'BaphometsDaughter', 'PoorlyTimedPhraseGuy', 'CornCobMcGee', 'hjalmar111', 'azzazaz', 'Midwork1', 'auriem', 'fuckHg', 'canipaybycheck', 'READMYSHIT', 'Smight', 'sighburg', 'Naughtiestdingo', 'AdamE89', 'TypicalWindow', 'mrpo-ruff', 'carlinha1289', 'Diazepam', 'THTIME', 'simgasm', 'lesboautisticweeabo', 'beanieb', 'Mr_Abe_Froman', 'redwall_hp', 'ManlyJowe', 'QueenFimbrethil', 'SomethingIWontRegret', 'techiesbesthero', 'Derf_Jagged', 'AndyWarwheels', 'RamblingOkie', 'Sandy_brothman', 'Spysix', 'Xiosphere', 'lolcats69', 'throwawayscientist2', 'Goal1', 'jasperzieboon', 'BeigeListed', 'ProEviIOperations', 'Mister_Jay_Peg', 'NO_TOUCHING__lol', 'n_reineke', 'cantcer', 'Jarl_Chick_Nugs', 'Adewotta', '_BindersFullOfWomen_', 'lordtuts', 'Trauermarsch', 'kreius', 'fireballbren', 'IAmTheShitRedditSays', 'phd_dude', 'lietuvis10LTU', 'LevTheRed', 'The_Fluffy_Walrus', 'FlippedTurtles', 'NSYK', 'RicoVig', 'webdoodle', 'bluefoot55', 'NLC40', 'atz_97', 'Zeydon', 'optimalg', 'Niflhe', 'Voidjumper_ZA', 'Bossman1086', 'StashYourCashews', 'Isentrope', 'thederpyeyes', 'TheOfficialDoubleSwe', 'long_wang_big_balls', 'Daniel15', 'Mgrth111', 'DubTeeDub', 'NDoilworker', 'AwardSpeechEdits', 'pepperouchau', 'Jenn_There_Done_That', 'BigJ76', 'mrnotloc', 'iSucksAtJavaScript', 'agamemn0n1', 'greeniethemoose', 'JouleS88', 'TheNewPoetLawyerette', 'immapeeinurass', 'anupthehipster', 'FallenAngelChaos', 'ohhwerd', 'Atomos128', 'mattiejj', 'irJustineee', 'LoveOfProfit', 'NTRX', 'A_Giant_Egg', 'TheSentinel_0', 'jlw_01', 'SeeThroughCanoe', 'SabroToothTiger', 'DancingHeel', 'GamationOnReddit', 'PoppinKREAM', 'beersndrums', 'Aelegans', 'Mr-Nebraska', 'ZadocPaet', 'xHOCKEYx12', 'mar10wright', 'Instagram', 'zepel', 'VilePug', 'Solthercunt', 'MrTempestilence', 'xmetalhead2000', 'Toolatelostcause', 'maybesaydie', 'Pharoside', 'visvis', 'siccoblue', 'hamolton', 'Clarkey7163', 'LuigiVargasLlosa', 'nickcavedoll', 'Ryulightorb', 'stopscopiesme', 'ConfusedByPans', 'JamiecoTECHNO', 'malicious_turtle', 'blksith0', 'aqouta', 'Sepulchxr', 'ROOTlN', 'actionbastard89', 'greets_you_as_Dennis', 'FortniteLegendD', 'Tornado9797', 'agreeablehitler', 'morr1025', 'NDoilworker', 'chjacobsen', 'xerodeth', '0chiii', 'ahbslldud', 'SaraByAccident', 'smokay83', 'DBCrumpets', 'AdamE89', 'noisyturtle', 'koraedo', 'pewkiemuffinboo', 'Prak903', 'Dustin-', 'blazefalcon', 'hiddentofu', 'shadowkiller168', 'DeadPrez', 'Brainzman', 'Elderthedog', 'IronProdigyOfficial', 'awkward_the_turtle', 'sloth_on_meth', 'fajardo99', 'UltimateProSkilz', 'Pinksister', 'Fletch71011', 'Seizing_sponge', 'DonQuixoteReference', 'SolarAquarion', 'eulogy_for_an_ology', 'tanzaniteflame', 'Proteon', 'lsentrope', 'skullknap', 'Growlitherapy', 'Power0fGamersO1', 'RickeyB', '0x_', 'wrc-wolf', 'Mega_Toast', 'Lol33ta', 'AntonioOfVenice', 'Xanatos903', 'JiveMonkey', 'Krogglidor', 'MostRadicalCentrist', 'O-shi', 'bigbowlowrong', 'dingofarmer2004', 'ContentWithOurDecay', 'sodypop', 'cwenham', 'acidrain666', 'TheSonar', 'riggity', 'Bancas', 'GummyBearGrylls', 'ArseBiscuits', 'snallygaster', 'Rad_Centrist_Mod', 'abe702', 'ArianaGrandesDonuts', 'BFKelleher', 'mrtommy', 'jhaun_shit', 'goblinhog', 'SpartacusThomas', 'brerkmgher', 'genderchangers', 'Erledigaeth', 'kodark', 'SkinnyShroomOfDeath', 'Smgth', 'Coffeechipmunk', 'LandGridArray', 'Allupertti', 'CitizenPremier', 'loomynartylenny', 'TheSentinel_15', 'Swimmingturtle247', 'Hooman2004', 'TheSpiritedGamer', 'EpitaFelis', 'OneRedSent', 'stealingyourpixels', 'GooeyChickenman', 'SirWalterPoodleman', 'AlbertIInstein', 'wtec', 'castdex', 'Deity_Of_Death', 'this_time_i_mean_it', 'zayap18', 'aphilosopherofmen', 'caferreri11', 'shakypears', 'beernerd', 'strokethekitty', 'pussgurka', 'kingphysics', 'NYPD-32', 'RandomExcess', 'Kesha_Paul', 'tehsma', 'PenguinSweetDreamer', 'thegeneralx', 'vikinick', 'LiterallyKesha', 'yocandygirl011195', 'mynameismunka', 'OBLIVIATER', 'WeaponsGradeHumanity', 'command3r_ISA', 'RabidTurtl', 'BR123456', 'fitzichael', 'greensunset', 'bazite', 'NullOfUndefined', 'The_Bhuda_Palm', 'Zachums', 'syo', 'mycatdoesmytaxes', 'Hilltopchill', 'jumbods64', 'G3m', 'GetOffMyLawn_', 'I_FART_OUT_MY_BUTT69', 'Feyle', 'WearyTunes', 'sooth_', 'IAmJacksBallOfHate', 'metrix', 'Thefivenines', 'IDontHaveAnAgenda', 'Can_The_SRDine', 'LeonDanksky', 'Rights_Advocate', 'AnthropomorphizedHat', 'noeatnosleep', 'i_like_turtles_1969', 'BornAgainNewsTroll', 'steelpan', 'I_love_Hopslam', 'senctrad', 'Kateraide', 'Keithiscool97', 'SeasOfTrees', 'LivingSaladDays', 'piyushsharma301', 'aedeos', 'cuddles_the_destroye', 'Im12AMA', 'Nomsfud', 'Flair_Helper', 'SixCatsInAnAlley', 'Nechaev', 'HiFructoseCornFeces', 'frankreddit5', 'imtn', 'potverdorie', 'pawsitivelypowerful', 'CrewsCrew', 'Heliozoan', 'xenokilla', 'Pol_Pots_Crockpot', 'DoctorRoosterMD', 'Dumbsbob_Tpants', 'HarrietPotter', 'MZ603', 'StrategicSarcasm', 'Tornado9797', 'PotatoMusicBinge', 'Subtle_Omega', 'DominusLutrae', 'ThatAstronautGuy', 'TheGroovyTurt1e', 'Coltrane23', 'Instant_Regret_mods', 'Thedaveabides98', 'johnharveykellogg', 'gossippetition', 'Shylo132', 'bitterred', 'boboyboxer', 'YhCHKN', 'Tod_Gottes', 'VIOLENT_POOP', 'diogenesjunior', 'misnamed', 'steveofftheinternet', 'CedarWolf', 'TheRedditPope', 'ImaginaryMod', 'ELFAHBEHT_SOOP', 'TheThirdStrike', 'redagfdgafd', 'chabuddy95', 'kwwxis', '30-xv', 'TheAurumGamer', 'k_princess', 'Series_of_Accidents', 'Emmx2039', 'CoachVega', 'RemoveNull', 'fizzypickles', 'CrankyLollopop', 'go1dfish', 'whatwildoes', 'TheRighteousTyrant', 'justcool393', 'ScarletShield', 'Scumbag__', 'thefryn', 'Keypaw', 'collapse_turtle', 'KittyKat1986', 'KINKY_RD', 'x_MyDude_x', 'DylanJonesey', 'Zapparoth', 'thebest77777', 'DanielTaylor', 'CowOrMonkey', 'Sanlear', 'BelleAriel', 'iDovke', '3nip5you', 'Thumperings', 'iNeverQuiteWas', 'NYLaw', 'pfohl', 'F_1_R_E', 'typhoid-fever', 'greensign', 'Ralph-Hinkley', 'carrots084', 'JackSucksAtTheKazoo', 'PotatoMusicBinge', 'volstedgridban', 'QuiteQ', 'jesuspunk', '_-Metatr0n-_', 'SuperTurtle', 'morebeansplease', 'calexil', 'APOPTO5I5', 'awkward_the_turtle', 'EnlightenedCentrist9', 'thirdegree', 'Minervaxcel', 'juliangray', 'GanjaGooBalls', 'LordeVinyl', 'QualityVote', 'THHBBB', 'AerateMark', 'madd74', 'the_r_gamemaster', 'TheSentinel_5', 'General_Insomnia', 'rsocfan', 'stoppage_time', 'LowSociety', 'Bornhuetter', 'MonikaForever', 'marsianer', 'PM_ME_MOD_INVITES', 'montblanc25', 'WhyThisJorgal', 'LordOfTheTorts', 'J4k0b42', 'LenaOxton01', 'hectorlizard', 'James007BondUK', 'kboy101222', 'krispykrackers', 'bossness555', 'kt_m_smith', 'AnnoyingCharacterLim', 'Quietuus', 'ggg730', 'DasBeardius', 'kmankx2', 'random-person-001', 'RJBlarmo', 'bytester', 'LANDLORD__MESSIAH', 'babar77', 'gangnam_style', 'Dlight98', 'bodom2245', 'AnSq', 'SirLotsaLocks', 'Atvelonis', 'thesonnysideup', 'Sunkisty', 'Myrandall', 'AnotherClosetAtheist', 'Lord__Hippo', 'Truegold43', 'Babypenis69', 'ReBurnInator', 'nodnarb232001', 'mycatiswatchingyou', 'soupyhands', 'NeedAGoodUsername', 'alottacrumbs', 'ArchangelleN8theGr8', 'DaylightDarkle', 'bobcobble2', 'ihaveallthelions', 'IronedSandwich', '18aidanme', 'dukesinbad', 'LickMyUrchin', 'Vince-Trousers', 'cahaseler', 'floozbag54', 'eyjafjallajoekull', 'IWitherman', '5o7', 'blau_wie_das_meer', 'DrShillgood', 'NorseFenrir', 'kgb_operative', 'stuffed02', 'Mooseman06', 'Tagesausbruch', 'TheMamaGary', 'fortune_cell', 'ucantsimee', 'Tiis-', 'Bodence', 'axle_steele', 'heaf517', 'celebsannounce', 'hwhouston517', 'tresser', 'MissCherryPi', 'meat_tunnel', 'CannedWolfMeat', 'ActuallyDavid_', 'Vusys', 'CartoonWarp', 'ramune17', 'lady-linux', 'SelfAwareMolecules', 'lolsail', 'Low_Town', 'dmoneyyyyy', 'lgf92', 'JustAnotherSimian', 'another-thing', 'WellHePaidForDinner', 'neophytetradclimber', 'Beboprockss', 'dicemaze', 'me131211', 'Boredguy58', 'SixIsNotANumber', 'ImNotReallyJesus', 'zangpakto', 'Lysis10', 'Caramel_Macchiato_32', 'stevenfrijoles', 'SampleName1337', 'ulubulu', 'BAN_VIDEO_GAMES_NOW', 'stopspammingme', 'Pharmakarmer', 'o_higgy', 'Belledame-sans-Serif', 'Butthole__Pleasures', 'Six6Sicks', 'Nate337', 'FlameItsMe', 'SamGamesPro', 'Fiery1Phoenix', 'GubmintStooge', 'spacehogg', 'Diastro', 'Warlizard', 'Galactic', 'jiandersonzer0', 'smikims', 'boi_thats_my_yeet', 'WorseThanHipster', 'Stockso', 'linkprovidor', 'watchyourparkinmeter', 'nuclearmeltdown2015', 'Zotfripper', 'fuzzy_winkerbean', 'b12ftw', 'Clerisme', 'dustinyo', 'Whack-aTroll', 'elcielo17', 'Mynameisnotdoug', 'helium_farts', 'xxLurker', 'emmster', 'ConnorK500', 'officer_panda159', 'Jayfeather69', 'michael7050', 'asde', 'King_of_the_Butt', 'AlveolarPressure', 'graslej', 'Reddisaurusrekts', 'Riock', 'UncleSamuel', 'dovercliff', 'Schiffy94', 'reynad_NaCl', 'imjustheretodomyjob', 'BigMurph26', 'joejoejoey', 'Googunk', 'Surly_Badger', 'Dave-The-Joker', 'TheSentinel_16', 'Villezki', 'emobatmanforever', 'CaptainChildLover', 'awesomesprime', 'SethRichOrDieTryin', 'thelazymd-mod', '-I-__am__Gallowboob', 'King_Abdul', 'OMGWTFBBQUE', 'the3sense', 'hollybooty', 'WiFilip', 'juancarias', 'Phallindrome', 'SpezForgotSwartz', 'TheGrandDalaiKarma', 'real_nice_guy', 'cerberus6320', 'fireflycities', 'VariousThoughts', 'IwataFan', 'jaggazz_V2', 'FreeComplimentsMod', 'DJ_Chaps', 'SupremoZanne', 'ahampster', 'amishredditor', 'HandicapperGeneral', 'MockDeath', 'jsmorley', 'TAKEitTOrCIRCLEJERK', 'IamUnique2035', 'originalucifer', '_tomGER', 'Nom_Chompy', 'mikepool1986', 'MattRyd7', 'fruitjerky', 'NovaSF', 'elpinko', 'x_minus_one', 'snoopfroggydog', 'radiozip', 'too_many_toasters', 'DocMcBrown', 'TehBamski', 'MotherHolle', 'thebular', '-Antiheld-', 'breadnukleus', 'goldninjaI', 'Reddit-User-3000', 'Splinxyy', 'erktheerk', 'Hope1995x', 'kikedank', 'Warneral', 'stinkylibrary', 'MugaSofer', 'cah578', 'agentlame', 'Neutrahl', 'Acidtwist', 'vxx', 'pomosexuality', 'dan__wizard', 'marc1309', 'CaptainBZarre', 'ForceBlade', 'Jackson1442', '4775795f4d616e', 'Ohmm', 'Sobsz', 'thatwentBTE', 'Novadestin', 'Too_MuchWhiskey', 'Pr2r', 'IronGemini', 'TheBroCodeEnforcer', 'tejmar', 'kellysama', 'familynight', 'shotpun', 'TopMind0fReddit', 'TotesMesseger', 'clobster5', 'brendanblack', 'Altrissa', 'DestinyCE', 'just-a-traveler', 'absurdlyobfuscated', 'WolfHaleyGolfWang', 'greenduch', 'wizarduss', 'PowerOfGamers01', 'Depraved_Turtle', 'Troll__LaLa_LaLa', 'petiterunner', 'FightFromTheInside', 'Trajan_', 'Sir_Meowstro', 'SlimJones123', 'splashboom123', 'RubyCodpiece', 'I_Am_Batgirl', 'jimbozak', 'BrokeCFO', 'Wtfisthatkid', 'K_Lobstah', 'sgtapples69', 'ityoclys', 'pwaves13', 'baconaro', 'hackensak', 'yours_duly', 'Walcott_Brooks', 'iKrazy', 'roastedbagel', 'joshimax', 'NinetoFiveHeroRises', 'Umbresp', 'Pewdsgamers', 'ZadocPaet', 'AkivaAvraham', 'JCSandt', 'Sephr', 'IrbyTumor', 'conalfisher', 'A_Cylon_Raider', 'blackbrandt', 'King-of-the-Snekes', 'MufflerMoose', 'Rated', 'Stuttero', 'futiliteur', 'taggerungkid', 'skizfrenik_syco', 'torncolours', 'uknjs', 'TreKs', 'Not_An_Ambulance', 'Hielexx_00', 'FrenchMotherFucker', 'BeansOnPostMalone', 'c64person', 'Mrsparklee', 'Multimoon', 'cheezerme', 'cantCme', 'Here_Comes_The_King', 'CarvarX', 'gnujack', 'redditMEred', 'Pushigoh', 'AmericanJBert', 'explohd', 'The--Lion', 'Deeked', 'Samoht99', 'elephantofdoom', 'Tsblloveyou', 'Endless_Vanity', 'Fandol', 'VindtUMijTeLang', 'JerryfromTomandJerry', 'd4rkph03n1x', 'Jonahoa', 'watercolorstain90', 'G4L4CT1C4', 'V1RtU4LxM3N4C3', 'imnoidiot', 'TheRevengeOfBob', 'reddithasaproblem', 'WillHasStyles', 'aonome', 'Romney_for_President', 'DualNeedlers', 'SmellsLikeMarbles', 'dustinyo_', 'abe703', 'innuendoPL', 'TJ_Schoost', 'FurryPornAccount', 'westcoastcdn19', 'NYLaw', 'A_Mouse_In_Da_House', 'trashlikeyourmom', 'Skyllz89', 'IndigoSoln', 'fedbuddy', 'Klaxun', 'MisterWoodhouse', 'pascal_prv', 'jhc1415', 'TylerFromCanada', 'Rhamni', 'Lightning_Farron', 'Avenger_of_Justice', 'fillhumpfree', 'Arkontas', 'lordsleepyhead', 'Zibabbidibow', 'JellyTornado', 'DavidLuizshair', 'caesar15', 'vlepun', 'SmileyFace-_-', 'Windex007', 'undergroundaleroad', 'indianawalsh', 'm0rris0n_hotel', 'malz_', 'Tenebra99', 'BusToNutley', 'must_warn_others', 'EightRoundsRapid', 'gentellotus', 'wzard', 'Cherry_Star_Cream', 'PmButtPics4ADrawing', 'dramasutra2020', 'smarvin6689', 'Zwemvest', 'HaikuberryFin', 'Minn-ee-sottaa', 'Feanorfanclub', 'sunbolts', 'Poppwall', 'persona_dos', 'Shy__RedheadV2', 'Computer_Name', 'NameBran', 'cwenham', 'WYLD_STALLYNS', 'DangKilla', 'morr1025', 'Jaraxo', 'B_Underscore', 'wisemcgee', 'awkwardtheparrot', 'BigMadGrape', 'hoosakiwi', 'themeatbridge', 'quelar', 'RetroBitTechnology', 'HAHApointsatyou', 'BeingNetwork', 'PapaKnowsDominoes', 'Duke_Paul', 'boogsley', 'Qbek-san', 'Isentrope', 'MikeyTheDinosaur', 'Cullly', 'FixinThePlanet', 'AFJ', 'leftabitcharlie', 'EquivalentSelf', 'Gentle_Catsine', 'Nasjere', 'Zaebos_11', 'organic_crystal_meth', 'duckduckCROW', 'GhostOfBearBryant', 'sodypoop', 'kingeryck', 'freewillbird', 'SoulFire6464', 'CelestialWalrus', 'Thatonetf2player', 'Shredder13', 'therealdanhill', 'JoyousCacophony', 'Dr_Mrs_TheM0narch', 'Swanksterino', '1Voice1Life', 'Norskiing', 'bakonydraco', 'The_ABC', 'sidshembekar', 'SuspiciousHistorian', 'dickfromaccounting', 'I_Regret_Everything', 'TIP_ME_COINS', 'laurtw', 'mjg13X', 'Sarahthelizard', 'SandwichIllustrious', 'GuidoZ', 'Booyahhayoob', 'AGreatWind', 'GuacamoleFanatic', 'mudkipz321', 'devtimi', 'KrustyKoonKrackers', 'iammrpositive', 'twentyone_21', 'Hooman_Super', 'NoMoreGoodNamesLeft', 'OG_gaiming01', 'fdf2002', 'M0D3RNW4RR10R', 'TheUnamedPotato', 'PM_ME_YOUR_FUZZTONE', 'Quietus42', 'bethlookner', 'smokinjoints', 'S_Jeru', 'femroot', 'just-here4the_memes', 'hellbilly479', 'Obama_Brigade', 'AryanShiro', 'barkingtortoise', 'ComedicSans', 'TuskenCam', 'GUIpsp', 'Arfmeow', 'xerodeth', 'hippz', 'tercerero', 'howdy_yall_im_billy', 'nstinson', 'CornCobMcGee', 'Cherry_Star_Cream', 'ToastIncCeo', 'theLAZYmd', '-HoosierBob-', 'Lady_Plague', 'TheWolfRevenge', 'qzapmlwxonskjdhdnejj', 'rhllor', 'budmourad', 'BallsHard', 'commonvanilla', 'alottacrumbs', 'sourcreamjunkie', 'aaronp613', 'catalyst518', 'lanks1', 'zapff', 'JonAce', 'ethanw12gd', 'CJ105', 'Chemical__', 'BiddyCavit', 'badmonkey0001', 'cistercianmonk', 'TheSentinel_18', 'RazgrizS57', 'Pirate_Redbeard', 'Kate_6_President', 'stopscopiesme', 'idio3', 'PapaNachos', 'gogorami', 'Sarge_Ward', 'Regis_Sterling', 'CalifornianBall', 'Endless_Vanity', 'ItsNotDrew', 'liltrixxy', 'not_your_pal', 'CharizardLvl100', 'zombieslayerzak', 'glider97', 'ricarroni', 'morduhcai', 'Zyiarius', 'EmmaHS', 'deckpumps_n_deldos', 'raspberrykraken', 'Alabaster_Sugarfoot', 'MrsDrZoidberg', 'Werner__Herzog', 'itsmyotherface', 'spookydaniel', 'jartwobs', 'TheSentinel_14', 'ipaqmaster', 'tornato7', 'Timbo_KZ', 'broccolibadass', 'Forthewolfx', 'IAmNotYourBoss', 'ctwtn', 'timelapse00', 'kwwxis', 'lingrush', 'fozzybau5', 'KSSLR', 'loves_being_that_guy', 'GeluNumber1', 'TheCaringAsshole', 'mungoflago', 'Noerdy', 'hercs247', 'YesChancellor', 'Baldemoto', 'the3sense', 'EvTheSmev', 'chezygo', 'nt337', 'trakmiro', 'crabbix', 'borez', 'sublimeinslime', 'Ie_reddit', 'NewbornMuse', 'Keijeman', 'silverboyp', 'KoleAF', 'GoodguyGrjoni', 'chadridesabike', 'wsgy111', 'Trump_Sim', 'supcaci', 'Memekip', 'lars-on-somnia', 'VodkaBarf', '1210saad', 'Zagorath', 'Gaget', 'dakta', 'Nerkson', 'SolidCake', 'SuperEnd123', 'Vailhem', 'jokes_on_you', 'twinned'];

function randomLowercaseString(length) {
  let result = '';
  const alphabet = 'abcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < length; ++i) {
    result += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
  }
  return result;
}

export function redditifyImage(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      const mimetype = file.type;

      if (mimetype === 'image/jpeg' || mimetype === 'image/png') {
        const img = new Image();
        img.onload = () => {
          if (img.width < 200 || img.height < 200) {
            resolve();
            return;
          }
          debugLog('Adding watermark');

          let watermarkH = img.height * 0.05;

          if (watermarkH < 30) {
            watermarkH = 30;
          }

          const cvs = document.createElement('canvas');
          cvs.width = img.width;
          cvs.height = img.height + watermarkH;

          const ctx = cvs.getContext('2d');
          ctx.drawImage(img, 0, 0);

          ctx.fillStyle = 'rgb(40, 40, 40)';
          ctx.fillRect(0, img.height, img.width, watermarkH);

          const sidePadding = img.width * 0.02;
          let textX = sidePadding;
          const barMid = img.height + watermarkH / 2;
          let fontSize = Math.round(watermarkH * 0.4);
          let font = `${fontSize}px arial`;

          const logoH = watermarkH * 0.6;
          const logoW = (logoH * 250) / 81; // maintain the aspect ratio

          const logoX = img.width - logoW - sidePadding;
          const logoY = barMid - logoH / 2;

          ctx.fillStyle = 'white';
          ctx.textBaseline = 'middle';
          ctx.font = font;

          const subreddit = subreddits[Math.floor(Math.random() * subreddits.length)];
          const username = usernames[Math.floor(Math.random() * usernames.length)];

          const textW = ctx.measureText(`Posted in r/${subreddit} by u/${username}`).width;
          const totalW = textW + sidePadding + img.width * 0.2;
          if (logoX < totalW) {
            fontSize = Math.round(fontSize * (logoX / totalW));
            font = `${fontSize}px arial`; // real font is SF Pro Display but ...
            ctx.font = font;
          }

          const postedIn = 'Posted in r/';
          ctx.fillText(postedIn, textX, barMid);
          textX += ctx.measureText(postedIn).width;

          ctx.font = `bold ${font}`;
          ctx.fillText(subreddit, textX, barMid);
          textX += ctx.measureText(subreddit).width;

          ctx.font = font;
          const by = ' by u/';
          ctx.fillText(by, textX, barMid);
          textX += ctx.measureText(by).width;

          ctx.font = `bold ${font}`;
          ctx.fillText(username, textX, barMid);

          const logo = new Image();
          logo.onload = () => {
            ctx.drawImage(logo, logoX, logoY, logoW, logoH);

            cvs.toBlob((blob) => {
              // mimic reddit filename
              const filename = `${randomLowercaseString(13)}.${file.name.split('.').slice(-1)}`;
              const nFile = new File([blob], filename, { type: mimetype });
              resolve(nFile);
            }, mimetype, 0.9);
          };

          logo.src = browser.runtime.getURL('icons/reddit.png');
        };

        img.src = reader.result;
      } else {
        resolve();
      }
    }, false);

    reader.readAsDataURL(file);
  });
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
        cvs.width = img.naturalWidth;
        cvs.height = img.naturalHeight;

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
