const { Client, Intents, Message } = require('discord.js');
const { token } = require('./config.json');
const Canvas = require('canvas');
// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
const { MessageEmbed, MessageAttachment, MessageActionRow, MessageButton } = require('discord.js');
const { Embed } = require('@discordjs/builders');
const wait = require('node:timers/promises').setTimeout;

module.exports = async function morpion(interaction)  {

	    const user2 = interaction.options.getUser("player_2");
		var embedMsg = new MessageEmbed()
			.setThumbnail("https://images.assetsdelivery.com/compings_v2/kahovsky/kahovsky1712/kahovsky171200043.jpg")
			.setColor('0xFFFFFF')
			.setTitle('Tic tac toe' )
			.setAuthor({name: "Players : \n" + `${interaction.user.tag} \n` + " VS \n" + `${user2.tag}`})
			.setDescription('Utilisez les boutons pour jouer')
			.addFields(
				{ name: '\u200B', value: '\u200B' },
			)
			.setTimestamp();
		const canvas = Canvas.createCanvas(510, 510);
		const context = canvas.getContext('2d');
		const background = await Canvas.loadImage('./morpion.png');
		context.drawImage(background, 0, 0, canvas.width, canvas.height);

		var mImg = new MessageAttachment(canvas.toBuffer(), 'morpion.png');
		embedMsg.setImage('attachment://morpion.png');


		const r1 = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('r00')
					.setLabel('↖')
					.setStyle('PRIMARY'),
				new MessageButton()
					.setCustomId('r01')
					.setLabel('⬆')
					.setStyle('PRIMARY'),
				new MessageButton()
					.setCustomId('r02')
					.setLabel('↗')
					.setStyle('PRIMARY'),

			);
		const r2 = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('r10')
					.setLabel('⬅')
					.setStyle('PRIMARY'),
				new MessageButton()
					.setCustomId('r11')
					.setLabel('⚪')
					.setStyle('PRIMARY'),
				new MessageButton()
					.setCustomId('r12')
					.setLabel('➡')
					.setStyle('PRIMARY'),
			);
		const r3 = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('r20')
					.setLabel('↙')
					.setStyle('PRIMARY'),
				new MessageButton()
					.setCustomId('r21')
					.setLabel('⬇')
					.setStyle('PRIMARY'),
				new MessageButton()
					.setCustomId('r22')
					.setLabel('↘')
					.setStyle('PRIMARY'),
			);

		var message = await interaction.reply({

			embeds: [embedMsg],
			fetchReply: true,
			files: [mImg],
			components: [r1, r2, r3]
		});

		var num = ['r00', 'r01', 'r02', 'r10', 'r11', 'r12', 'r20', 'r21', 'r22'];
		const filter = i => num.includes(i.customId) && (i.user.id === interaction.user.id || i.user.id === user2.id);

		const collector = interaction.channel.createMessageComponentCollector({ filter, time: 120000 });

		var x;
		var y;
		var b = false;
		var btnTrace = "";
		var mark;
		var board = [
			['0', '0', '0'],
			['0', '0', '0'],
			['0', '0', '0']
		];
		collector.on("collect", async btn => {

		var current_user = btn.user.id;
			switch (btn.customId) {
				case 'r00':
					x = 15;
					y = 15;
					break;
				case 'r01':
					x = 180;
					y = 15;
					break;
				case 'r02':
					x = 340;
					y = 15;
					break;

				case 'r10':
					x = 15;
					y = 180;
					break;
				case 'r11':
					x = 180;
					y = 180;
					break;
				case 'r12':
					x = 340;
					y = 180;
					break;

				case 'r20':
					x = 15;
					y = 345;
					break;
				case 'r21':
					x = 180;
					y = 345;
					break;
				case 'r22':
					x = 340;
					y = 345;
					break;

			}



			if (current_user == interaction.user.id) {
				symb = await Canvas.loadImage("croix.png");
				mark ='1';
			}
			else {
				symb = await Canvas.loadImage("cercle.png");
				mark='2';
			}

			if (btn.user.id != btnTrace) {

				num.splice(num.indexOf(btn.customId), 1);
				btnTrace = btn.user.id;

				context.drawImage(symb, x, y, 150, 150);
				mImg = new MessageAttachment(canvas.toBuffer(), 'morpion.png');
				embedMsg.setImage('attachment://morpion.png');

				await btn.deferUpdate();




				await interaction.editReply({

					embeds: [embedMsg],
					fetchReply: true,
					files: [mImg],
					components: [r1, r2, r3]
				}

				)
				board[parseInt(btn.customId.charAt(2))][parseInt(btn.customId.charAt(1))] = mark;
			
	
			}

			for(var i = 0; i < board.length; i++) {
				console.log("\n");
				for(var z = 0; z < board.length; z++) {
					process.stdout.write( '['+board[z][i]+']');
				}
			  }
			if((board[0][0]==mark && board[0][1]== mark && board[0][2]==mark )|| //for row1 

            (board[1][0]==mark && board[1][1]==mark && board[1][2]==mark )||    //for row2

            (board[2][0]==mark && board[2][1]==mark && board[2][2]==mark )||    //for row3

            (board[0][0]==mark && board[1][0]==mark && board[2][0]== mark )||  //for Colm1 

            (board[0][1]==mark && board[1][1]==mark && board[2][1]==mark )||  //for Colm 2

            (board[0][2]==mark && board[1][2]==mark && board[2][2]==mark )||  //for colm 3

            (board[0][0]==mark && board[1][1]==mark && board[2][2]==mark )|| //diagnole 1

            (board[0][2]==mark && board[1][1]==mark && board[2][0]==mark )) //diagonal 2
			{ 
			
				

				
				var embedMsg1 = new MessageEmbed()
			.setThumbnail("https://images.assetsdelivery.com/compings_v2/kahovsky/kahovsky1712/kahovsky171200043.jpg")
			.setColor('0xFFFFFF')
			.setTitle('Tic tac toe' )
			.setAuthor({name: "Players : \n" + `${interaction.user.tag} \n` + " VS \n" + `${user2.tag}`})
			.setDescription('Gagnant : ' + `${btn.user.tag}` )

				embedMsg1.setImage("https://www.pngplay.com/wp-content/uploads/8/Winner-PNG-Free-File-Download.png")
				// nom du gagner + image modifiée

				await interaction.editReply({
					embeds: [embedMsg1],
					fetchReply: true,
					files: [],
					components: []
				}

				)
			}


		});



		collector.on('end', collected => console.log(`Collected ${collected.size} items`));










};