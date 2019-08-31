# check_list_revamp

Rule of thumb when coding in Blockchain: if you have to do anything between variables other than assigning values, you are doing something very wrong. DO NOT DO COMPLICATE CALCULATE IN BLOCKCHAIN. IT'S EXPENSIVE.  

I've updated the arrangement of code. Fix something to greatly reduce the cost of deploying the thing. Though, due to the nature of Blockchain, its readablity won't be very good. 

I need some advises about simple versatile multiple dimensional structure. I've beens spending two days just to design a proper structure for this idea, I couldn't come up with a proper thought. Windows device regedit have successfully created such structure so I think it's not impossible. Still quite hard though. 

The log recording function, it's surely convenient for users to track down who has done what. But it has a huge problem. That if we have too many functions that need to log event, it's like you double the contract's deploy fee. 

Initially, this contract cost ~ 0.03 ETH, now it has doubled up to ~ 0.07 ETH, which is quite significant. So, this ultility needs to be considered in the future.

With the back-end revamp, front-end has to do a lot of works. Like a fuck ton of works since all the logics that can be handled so easily in back-end are no longer used anymore because we want to reduce as much initial cost as possible. In modern working plan, in my opinion, Blockchain is actually a terrible database for teamworking. There will be only 3 sides, the BrSE, clients, and a small dev team consist of 4-5 people at max. Since the developers must be fullstack dev unless everything is designed flawlessly right from the start. Any changes that need to be made in Blockchain will lead to heavily mental stress, not to mention a huge chunk of money required to relaunch the contract.

(Unlike other databases like MongoDB or SQL, the value that Solidity returns are 0,1,2,3... of an Array, not "Carrots","Cabbage",... of "Vegetable" object, so fixing code will be a pain since everything seems so vague.)

PS: I've done some major change in the front-end to make the code somewhat 'readable', still it's very very very VERY hard to have a firm grasp of the whole thing.

To reduce the cost of the project, frontend has to do a lot of work. The code is really either ugly or super long to read which is also super ugly. 

My design skill are showing flaws due to lack of experience. If only I had a partner working with me on this one.

I could have updated it to be the idea sharer, could be used in couple companies and actually enticing people to contribute their thoughts to cultivate the company. But it at least 3 more functions (about 2 more sol file and some reorganize and a very thoughtful of a fee list to setup transfer system) It will take a lot of time for something I'm doing for fun so I'll stop here for a bit. 

At first I was trying to recreate Trello but due to the nature of Blockchain, it swayed me to doing something else, still nice though.
