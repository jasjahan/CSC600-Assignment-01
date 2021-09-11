/* ==========================================================================  **
## Honor Pledge
** ============================================================================ */

export const HONOR_PLEDGE = "I pledge on my honor that this assignment is my own work.";
export const SIGNATURE = "MST JASMINE JAHAN"; // TODO: FILL ME IN

// If you had any collaborators on this assignment, please list their github handles here.
export const COLLABORATORS = [
    "github handle of collaborator 1", // TODO: FILL ME IN
];

// If you used any resources, please list them here
export const RESOURCES_CONSULTED = [
    "www.google.com", "FirefoxMDN", "repl.it", "Udemy", "You tube"// TODO: FILL ME IN
];


/* ==========================================================================  **
## Problem 1: Numbers

This problem is a warmup. Consider the following sequence of numbers

S_1 = 1*1
S_n = n*n + S_{n-1}

which is a sum of squares. For example,

S_2 = 2*2 + S_1 
    = 2*2 + 1*1

and

S_3 = 3*3 + S_2
    = 3*3 + (2*2 + S_1)
    = 3*3 + (2*2 + 1*1).

S_n = 0 for any n <= 0.
You may assume that all numbers are integers.
** ============================================================================ */


/* ----------------------------------------------------- **
## Problem 1a:

Write sum of squares **iteratively**.
** ----------------------------------------------------- */

export function iterSumOfSquare(n: number): number {
    // TODO: implement me
    let sum = 0;
    for(let i = 1; i<=n; i++){
        sum = sum + (i*i);
    }
    return sum;
    //return 0;
}


/* ----------------------------------------------------- **
## Problem 1b:

Write sum of squares **recursively**.
** ----------------------------------------------------- */

export function recSumOfSquare(n: number): number {
    // TODO: implement me
    let sum = 0;
   if(n > 0) {
       
       sum = (n * n) + recSumOfSquare(n-1) ;
   }
   return sum;
    //return 0;
}


/* ----------------------------------------------------- **
## Problem 1c:

Write down two test cases.
** ----------------------------------------------------- */

export const test1: [number, number] = [3, 14] // [n1, sumOfSquare(n1)] TODO: change me
export const test2: [number, number] = [4, 30] // [n2, sumOfSquare(n2)] TODO: change me


/* ----------------------------------------------------- **
## Problem 1d:

You now have two implementations of the "same" function.
One way to check the correctness of either implementation is
to perform differential testing where you only need to know
the input and check that the outputs are the same. Note that
the function could still be wrong ... both functions could be
implemented incorrectly in the same way. However, this will
reduce the probability that there is a bug because if the two
functions are implemented incorrectly, it is more likely that
they "incorrect" in different ways.

Write down two more inputs.
** ----------------------------------------------------- */

export function differentialTest(n: number): boolean {
    const result = iterSumOfSquare(n) === recSumOfSquare(n);
    if (!result) {
        console.log(`iterSumOfSquare(${diffTest1}) = ${iterSumOfSquare(diffTest1)} != recSumOfSquare(${diffTest1}) = ${recSumOfSquare(diffTest1)}`);
    }
    return result;
}

export const diffTest1: number = 1  // n1, TODO: change me
export const diffTest2: number = 2  // n2, TODO: change me
export const diffTest3: number = 3
export const diffTest4: number = 4

differentialTest(diffTest1);
differentialTest(diffTest2);
differentialTest(diffTest3);
differentialTest(diffTest4);



/* ==========================================================================  **
## Problem 2: Lists and Trees

In class, we introduced lists and trees as examples of ADTs. In this problem,
we'll look at converting between lists and trees.
** ============================================================================ */

export enum _List { NIL, CONS };
export type List<T> = {tag: _List.NIL} | {tag: _List.CONS, contents: T, rest: List<T>};

export function Nil<T>(): List<T> {
    return {tag: _List.NIL};
}

export function Cons<T>(x: T, ls: List<T>): List<T> {
    return {tag: _List.CONS, contents: x, rest: ls};
}


export enum _Tree { LEAF, NODE };
export type Tree<T> = {tag: _Tree.LEAF} | {tag: _Tree.NODE, contents: T, left: Tree<T>, right: Tree<T>};

export function Leaf<T>(): Tree<T> {
    return {tag: _Tree.LEAF};
}

export function Node<T>(x: T, left: Tree<T>, right: Tree<T>): Tree<T> {
    return {tag: _Tree.NODE, contents: x, left: left, right: right};
}

export function LeafNode<T>(x: T): Tree<T> {
    return Node(x, Leaf(), Leaf());
}


/* ----------------------------------------------------- **
### Problem 2a:

Convert a tree into a list using "mirrored" postfix ordering.
That is, we'll visit the right child, the left child, and then
finally the current node. (In standard postfix, we'll visit the
left, the right, and then the current node.)


- Example 1: 

Original 
```
   1
  / \
 2   3
```

Postfix
```
2 -> 3 -> 1
```

Mirrored Postfix
```
3 -> 2 -> 1
```

- Example 2:

Original 
```
   1
  / \
 2   3
 |  / \
 4  5  6
```

Postfix
```
4 -> 2 -> 5 -> 6 -> 3 -> 1
```

Mirrored Postfix
```
6 -> 5 -> 3 -> 4 -> 2 -> 1
```
** ----------------------------------------------------- */
function appendReverseList<T>(a: List<T>, b: List<T>): List<T>{
    for(let head = a; head.tag != _List.NIL; head = head.rest){
        b = Cons(head.contents, b);
    }
    
    return b;
}


export function mirroredPostfix<T>(t: Tree<T>): List<T> {
     if(t.tag == _Tree.LEAF){
        return Nil();
    }
    
    let rightlist: List<T> = mirroredPostfix(t.right);
    let leftlist: List<T> = mirroredPostfix(t.left);
   
    
    
    
    
    let l1:List<T> =  appendReverseList(rightlist, Nil());
    let l2: List<T> = appendReverseList(leftlist, l1);
    let l3: List<T> = Cons(t.contents, l2);
    
   
    
    return appendReverseList(l3, Nil());
    // TODO: Implement me
    //return Nil();
}


/* ----------------------------------------------------- **
### Problem 2b:

Previously we converted a tree into a list. Now we will convert a list into an array.

Example 1:

List
```
1 -> 2 -> 3 -> 4
```

Array
```
[1, 2, 3, 4]
```
** ----------------------------------------------------- */

export function listToArr<T>(ls: List<T>): T[] {
    // TODO: Implement me
     let myArray = [];  
     for(let head = ls; head.tag != _List.NIL; head = head.rest){
         myArray.push(head);
     }
     
     return myArray;
    //return [];
}


/* ----------------------------------------------------- **
### Problem 2c:

In this problem we'll convert an array into a tree.

- Example 1:

Array
```
[1, 2, 3]
```

Tree
```
    2
   / \
  1   3
```

- Example 2:

Array
```
[1, 2, 3, 4]
```

Tree
```
    3
   / \
  2   4
 /    
1
```

- Example 3:

Array
```
[1, 2, 3, 4, 5]
```

Tree
```
    3
   / \
  2   5
 /   /
1    4
```

- Example 4:

Array
```
[1, 2, 3, 4, 5, 6]
```

Tree
```
     4
    / \
   /   \
  2     6
 / \    /
1   3  5
```
** ----------------------------------------------------- */

// Hint: use recursion with arr.slice 
export function arrayToTree<T>(arr: T[]): Tree<T> {
    if(arr.length === undefined){
        return Leaf();
    }
    
    let half = Math.floor(arr.length / 2);  
    let firstHalf = arr.slice(0, half-1);
    let secondHalf = arr.slice(-half);
    
    let leftTree = arrayToTree(firstHalf);
    let rightTree = arrayToTree(secondHalf);
    
    
    return Node(arr[half], leftTree, rightTree);
    // TODO: Implement me
    //return Leaf();
}


/* ----------------------------------------------------- **
### Problem 2d:

In summary, we saw we could convert trees into lists, lists into
arrays, and arrays back into trees. Consequently, an algorithm on
trees can be applied to arrays. For example, in class, we saw
that we could compute the smallest element in an array iteratively
and recursively.

Write a **recursive** function that finds the smallest element in a
tree of numbers. If it is an empty Tree, return NaN. We can then
find the smallest number in a tree using this  implementation as in
```
function smallestElementArr2(arr: number[]): number {
    return smallestTree(arrayToTree(arr));
}
```
```
** ----------------------------------------------------- */

export function smallestTree(tr: Tree<number>): number {
    // TODO: Implement me
    if(tr.tag == _Tree.LEAF ){
        return NaN;
    }
        let res = tr.contents;
        let lres = smallestTree(tr.left);
        let rres = smallestTree(tr.right);
   
        if ((lres != NaN) && (lres < res)){
            res = lres;
        }
    
        else if ((rres !=NaN) && (rres < res)){
            res = rres;
        }
            
       
        return res;
    //return NaN;
}



/* ==========================================================================  **
## Problem 3: Hybrid List and Tree

We saw lists and binary trees in class. If the problem we are working on is a list
or tree, then we can reuse generic list and tree data-types. However, the problem
at hand may not be exactly a list or tree, in which case we will need to define our
own data-types. In this problem, we will practice defining our own data-types. We
will look at hybrid lists and trees where a tree can have one or two children. We
give the BNF below.

<hybrid> ::= HLeaf | OneChild(x, <hybrid>) | TwoChild(x, <hybrid>, <hybrid>)
** ============================================================================ */


/* ----------------------------------------------------- **
### Problem 3a:

Complete the data-type definition below.
** ----------------------------------------------------- */

export enum _Hybrid { HLEAF, ONECHILD, TWOCHILD };
export type Hybrid<T> = {tag: _Hybrid.HLEAF} 
                |{tag: _Hybrid.ONECHILD, contents: T, firstchild: Hybrid<T>} 
                |{tag: _Hybrid.TWOCHILD , contents: T, firstchild: Hybrid<T>, secondchild: Hybrid<T>}; // TODO: implement the rest




export function HLeaf<T>(): Hybrid<T> {
    return {tag: _Hybrid.HLEAF}; // This one is completed/
}


export function OneChild<T>(x: T, child: Hybrid<T>): Hybrid<T> {
    // TODO: implement me
    return {tag: _Hybrid.ONECHILD, contents: x, firstchild : child};
}

export function TwoChild<T>(x: T, left: Hybrid<T>, right: Hybrid<T>): Hybrid<T> {
    // TODO: implement me
    return {tag: _Hybrid.TWOCHILD , contents: x, firstchild : left, secondchild : right };
}




/* ----------------------------------------------------- **
### Problem 3b:

Implement the following two structures in the `Hybrid` ADT.

hybrid1
```
    3
   / \
  2   5
  |   |
  1   4
```

hybrid2
```
     4
    / \
   /   \
  2     6
 / \    |
1   3   5

Use OneChild for LeafNodes.
```
** ----------------------------------------------------- */

export const hybrid1 = HLeaf(); 
const hybrid1 = HLeaf();
const hybridLeafNode1 = OneChild(1,HLeaf());
const hybridLeafNode4 = OneChild(4,HLeaf());
const hybridOneChild2 = OneChild(2,hybridLeafNode1);
const hybridOneChild5 = OneChild(5,hybridLeafNode4);
export const hybridTwoChild3 = TwoChild(3,hybridOneChild2, hybridOneChild5);// TODO: implement me


export const hybrid2 = HLeaf();
const hybridLeafNode1 = OneChild(1, HLeaf() );
const hybridLeafNode3 = OneChild(3, HLeaf());
const hybridLeafNode5 = OneChild(5, HLeaf());
const hybridOneChild6 = OneChild(6,hybridLeafNode5);
const hybridTwoChild2 = TwoChild(2,hybridLeafNode1,hybridLeafNode3);
export const hybridTwoChild4 = TwoChild(4,hybridTwoChild2,hybridOneChild6 );// TODO: implement me



/* ----------------------------------------------------- **
### Problem 3c

You may have noticed that the Hybrid ADT was able to encode
the "same" structures as Tree data structure. That the "same"
data can be stored in a variety of equivalent encodings can
occur in practice.

Write a **recursive** function that converts a Hybrid data
structure into a Tree structure. When translating a node with
one child into a node, put the child in the left child.
** ----------------------------------------------------- */

function NodeSpecial<T>(x: T, left: Tree<T>): Tree<T> {
    return {tag: _Tree.NODE, contents: x, left: left, right: Leaf()};
}


function hybridToTree<T>(hybrid: Hybrid<T>): Tree<T> {
    // TODO: implement me
     
    if(hybrid.tag === _Hybrid.HLEAF){
        return Leaf();
    }else if(hybrid.tag === _Hybrid.ONECHILD){
        let c = hybridToTree(hybrid.firstchild);
        return NodeSpecial(hybrid.contents, c);
    }else if(hybrid.tag === _Hybrid.TWOCHILD){
        let a = hybridToTree(hybrid.firstchild);
        let b = hybridToTree(hybrid.secondchild);
        return Node(hybrid.contents, a, b);
    }
    
    return Leaf();
    
}



/* ==========================================================================  **
## Problem 4: JSON

You may be familiar with a concept known as a **webscraper** that:

1. Visits a web-page
2. *Recursively* visits each link on that page

This might produce a JSON data-structure such as

```
[
  {
    "url": "www.foobar.com",
    "links": [ { links json ... }]
  },
  ...,
  {
    "url": "www.bazbae.com",
    "links": [ { links json ... }]
  },
]
```
** ============================================================================ */

export type JSONValue = null | string | JSONObject | JSONValue[];
export type JSONObject = { [key: string]: JSONValue };

export const jsonLinkExample: JSONValue = [
    {
        "url": "one.com",
        "links": [ 
            {
                "url": "two.com", 
                "links": [],
            },
            {
                "url": "three.com", 
                "links": [],
            }
        ]
    },
    {
        "url": "four.com",
        "links": [ 
            {
                "url": "seven.com", 
                "links": [
                    {
                        "url": "one.com",
                        "links": [
                            {
                                "url": "eight.com",
                                "links": []
                            }
                        ]
                    }
                ],
            },
            {
                "url": "three.com", 
                "links": [],
            }
        ]
    }
]


/* ----------------------------------------------------- **
### Problem 4a

Write a **recursive** function that creates an array of all
URLs (duplicates included) found in the JSON.
** ----------------------------------------------------- */

export function allURL(json: JSONValue): string[] {
    // TODO: Implement me
      if(typeof json === null){
        return [];
    }  
    else if(typeof json === "string"){
        return [];
    } 
    else if(typeof json === "object"){
        if(json.key === "url"){
           let urlArray: string = []; 
           urlArray.push(json.url);
           return urlArray; 
        } else if(json.key === "links"){
           return allURL(json.links);
        }   
        
            return [];
        
    }    
    else if(Array.isArray("JSONValue[]")){
        let result2:string = [];
        let size = json.length();
        for(let i = 0; i<size; i++){
            //let result3: string = [];
            let result3 = allURL(json[i]);
            result2.concat(result3);
           
        }
         return result2;
        
    }  
    return []
}


/* ----------------------------------------------------- **
### Problem 4b

Given a JSON as above where "links" contains the same JSON
format, arbitrarily nested, write a **recursive** function
that counts the number of times an exact match of a given url
occurs in the JSON object.
** ----------------------------------------------------- */

export function recCountURL(url: string, json: JSONValue): number {
    // TODO: Implement me
    if (typeof json === null){
        return 0;
    } else if (typeof json === "string"){
        return 0;
    } else if (typeof json === "object"){
        if (json.key == "url"){
            if (json.url == url_val){
                return 1;
            }
            return 0;
        } else if (json.key == "links"){
           return recCountURL(url_val, json.links);
        } 
        return 0;
    }  
    else if (Array.isArray("JSONValue[]")){
        let count = 0;
        for (let i = 0; i < json.length(); i++){
             count += recCountURL(url_val, json[i]);
        }
        return count;
    }  
    
    return 0;
}


/* ----------------------------------------------------- **
### Problem 4c

Do the same as problem 4a but this time with an **iterative**
function.
** ----------------------------------------------------- */

export function iterCountURL(url: string, json: JSONValue): number {
    // TODO: Implement me
    let callStack: [string, Tree<T> | string][] = [];
    
    
    return 0;
}
