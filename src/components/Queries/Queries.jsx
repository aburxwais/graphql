import { gql } from "@apollo/client";

export const UserInfo = gql`
  query UserInfo {
    user {
      id
      login
      email
      lastName
      firstName
    }
  }
`;

export const AuditsDone = gql`
  query AuditsDone {
    transaction_aggregate(where: { type: { _eq: "up" } }) {
      aggregate {
        sum {
        
          amount
        }
      }
    }
    user {
      auditRatio
    }
  }
`;

export const AuditsRecieved = gql`
  query AuditsRecieved {
    transaction_aggregate(where: { type: { _eq: "down" } }) {
      aggregate {
        sum {
          amount
        }
      }
    }
  }
`;



export const UserXP = gql`

query GetUserXP{
  transaction_aggregate(
       where: {
         event: { path: { _eq: "/bahrain/bh-module" } }
         type: { _eq: "xp" }
       }
     ) {
       aggregate {
         sum {
           amount
         }
       }
     }
   }
`;

export const Projects = gql`

query User_Skills {
  transaction(
    where: {
      type:   { _eq: "xp" },
      object: { type: { _eq: "project" } }
    },
    order_by: { createdAt: asc }      # ← sort by date
  ) {
    amount
    createdAt                         # ← fetch this too
    object {
      name
    }
  }
}
`;

export const CurrentProject = gql`
  query Current_Project {
    progress(
      where: { object: { type: { _eq: "project" } }, isDone: { _eq: false } }
      order_by: { updatedAt: desc }
      limit: 1
    ) {
      object {
        name
      }
    }
  }
`;

export const ToadGameResults = gql`
  query {
    toad_session_game_results {
      level
      result {
        name
      }
      attempts
    }
  }
`;