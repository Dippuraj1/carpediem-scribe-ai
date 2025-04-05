
import { BookParams } from './types';

// Generate a sample book when API fails or for testing
export const generateSampleBook = (params: BookParams): string => {
  // Create book title
  let bookContent = `Book Title: ${params.title}\n\n`;
  
  // Create table of contents
  bookContent += `Table of Contents\n`;
  for (let i = 1; i <= params.chapterCount; i++) {
    let chapterTitle = "";
    if (i === 1) chapterTitle = "Introduction to the Journey";
    else if (i === 2) chapterTitle = "The First Challenge";
    else if (i === 3) chapterTitle = "Rising Tension";
    else if (i === 4) chapterTitle = "The Climax";
    else if (i === 5) chapterTitle = "Resolution and New Beginnings";
    else chapterTitle = `Chapter ${i} Title`;
    
    bookContent += `Chapter ${i}: ${chapterTitle}\n`;
  }
  bookContent += `\n`;
  
  // Create chapters
  for (let i = 1; i <= params.chapterCount; i++) {
    let chapterTitle = "";
    let chapterContent = "";
    
    if (i === 1) {
      chapterTitle = "Introduction to the Journey";
      chapterContent = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;
    } else if (i === 2) {
      chapterTitle = "The First Challenge";
      chapterContent = `Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.

Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.`;
    } else if (i === 3) {
      chapterTitle = "Rising Tension";
      chapterContent = `At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.

Similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.`;
    } else if (i === 4) {
      chapterTitle = "The Climax";
      chapterContent = `Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.

Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.`;
    } else if (i === 5) {
      chapterTitle = "Resolution and New Beginnings";
      chapterContent = `Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.

Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus.`;
    } else {
      chapterTitle = `Chapter ${i} Title`;
      chapterContent = `This is the content for chapter ${i}. It includes some filler text to demonstrate how the book would look with real content.

This is a second paragraph for this chapter to demonstrate paragraph spacing.`;
    }
    
    bookContent += `Chapter ${i}: ${chapterTitle}\n\n${chapterContent}\n\n`;
  }
  
  return bookContent;
};
