package com.example.backend_lms.service;

import com.example.backend_lms.dto.ConversationDTO;
import com.example.backend_lms.dto.PageDTO;
import com.example.backend_lms.entity.Conversation;
import com.example.backend_lms.repo.ConversationRepo;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ConversationService {

    @Autowired
    ConversationRepo conversationRepo;

    public ConversationDTO convert(Conversation conversation){
        return new ModelMapper().map(conversation, ConversationDTO.class);
    }

    @Transactional
    public void create(ConversationDTO conversationDTO){
        conversationRepo.save(new ModelMapper().map(conversationDTO, Conversation.class));
    }

    @Transactional
    public void delete(int id){
        conversationRepo.deleteById(id);
    }

    public PageDTO<List<ConversationDTO>> getConversation(int course_id, int current_page){
        Sort sortBy = Sort.by("createdDate").descending();
        PageRequest pageRequest = PageRequest.of(current_page, 15, sortBy);
        Page<Conversation> page = conversationRepo.findAllByCourse(course_id, pageRequest);

        List<ConversationDTO> conversationDTOS = page.get().map(this::convert).collect(Collectors.toList());
        PageDTO<List<ConversationDTO>> pageDTO = new PageDTO<>();
        pageDTO.setTotalPages(page.getTotalPages());
        pageDTO.setSize(page.getSize());
        pageDTO.setTotalElements(page.getTotalElements());
        pageDTO.setData(conversationDTOS);
        return pageDTO;
    }
}
