"use strict";(()=>{var e={};e.id=702,e.ids=[702],e.modules={145:e=>{e.exports=require("next/dist/compiled/next-server/pages-api.runtime.prod.js")},249:(e,t)=>{Object.defineProperty(t,"l",{enumerable:!0,get:function(){return function e(t,r){return r in t?t[r]:"then"in t&&"function"==typeof t.then?t.then(t=>e(t,r)):"function"==typeof t&&"default"===r?t:void 0}}})},766:(e,t,r)=>{r.r(t),r.d(t,{config:()=>v,default:()=>b,routeModule:()=>E});var i={};r.r(i),r.d(i,{config:()=>A,default:()=>S});var a=r(802),n=r(153),o=r(249);let s=require("@apollo/subgraph"),l=require("@apollo/utils.keyvaluecache"),d=require("mongoose");var u=r.n(d);let c=new(u()).Schema({taskName:{type:String,required:[!0,"Task name is required"]},description:{type:String,required:[!0,"Description is required"],minlength:[10,"Description must be at least 10 characters long"]},isDone:{type:Boolean,default:!1},priority:{type:Number,required:[!0,"Priority is required"],min:[1,"Priority must be at least 1"],max:[5,"Priority cannot exceed 5"]},tags:{type:[String],default:[]}},{timestamps:!0}),p=u().models.Task||u().model("Task",c),h=async(e,{taskName:t,description:r,isDone:i=!1,priority:a,tags:n=[]})=>{if(r.length<10)throw Error("Description must be at least 10 characters long");if(a<1||a>5)throw Error("Priority must be between 1 and 5");let o=new p({taskName:t,description:r,isDone:i,priority:a,tags:n,createdAt:new Date,updatedAt:new Date});try{return await o.save()}catch(e){throw Error("Failed to create task")}},g=async(e,{taskId:t,taskName:r,description:i,isDone:a,priority:n,tags:o})=>{let s={};if(r&&(s.taskName=r),i){if(i.length<10)throw Error("Description must be at least 10 characters long");s.description=i}if(n){if(n<1||n>5)throw Error("Priority must be between 1 and 5");s.priority=n}void 0!==a&&(s.isDone=a),o&&(s.tags=o),s.updatedAt=new Date;try{let e=await p.findByIdAndUpdate(t,s,{new:!0});if(!e)throw Error("Task not found");return e}catch(e){throw Error("Failed to update task")}},y=async()=>{try{return await p.find({isDeleted:!1})}catch(e){throw Error("Failed to fetch tasks")}},f=async()=>{try{return await p.find({isFinished:!0})}catch(e){throw Error("Failed to fetch finished tasks")}},m=require("apollo-server-cloud-functions"),k=async()=>{try{await u().connect(process.env.MONGODB_URL),console.log("connection successful")}catch(e){console.log("Mongoose connection error",e),console.log("connection Failed")}},P=require("graphql-tag"),w=P.gql`
  type Task {
    id: ID!
    title: String!
    description: String!
    isDeleted: Boolean!
    isFinished: Boolean!
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    helloQuery: String
    getAllTasks: [Task!]!
    getFinishedTasksLists: [Task!]!
  }

  input CreateTaskInput {
    title: String!
    description: String!
  }

  input UpdateTaskInput {
    title: String
    description: String
    isFinished: Boolean
    isDeleted: Boolean
  }

  type Mutation {
    sayHello(name: String!): String
    addTask(input: CreateTaskInput!): Task!
    updateTask(id: ID!, input: UpdateTaskInput!): Task!
  }
`;k();let T=new m.ApolloServer({schema:(0,s.buildSubgraphSchema)({typeDefs:w,resolvers:{Query:{helloQuery:()=>"This is hello Query",getAllTasks:y,getFinishedTasksLists:f},Mutation:{sayHello:(e,{name:t})=>`This is hello Mutation ${t}`,addTask:h,updateTask:g}}}),introspection:!0,csrfPrevention:!0,cache:new l.InMemoryLRUCache,context:({req:e,res:t})=>({headers:e.headers,req:e,res:t})}),A={api:{bodyParser:!1,externalResolver:!0}},S=T.createHandler(),b=(0,o.l)(i,"default"),v=(0,o.l)(i,"config"),E=new a.PagesAPIRouteModule({definition:{kind:n.x.PAGES_API,page:"/api/graphql",pathname:"/api/graphql",bundlePath:"",filename:""},userland:i})},153:(e,t)=>{var r;Object.defineProperty(t,"x",{enumerable:!0,get:function(){return r}}),function(e){e.PAGES="PAGES",e.PAGES_API="PAGES_API",e.APP_PAGE="APP_PAGE",e.APP_ROUTE="APP_ROUTE"}(r||(r={}))},802:(e,t,r)=>{e.exports=r(145)}};var t=require("../../webpack-api-runtime.js");t.C(e);var r=t(t.s=766);module.exports=r})();